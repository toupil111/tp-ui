import type { Ref } from "vue";
import { ref, watch, toRef } from "vue";
// import type { Fn, MaybeRefOrGetter } from '@vueuse/shared'
// import { toRef, tryOnScopeDispose, useIntervalFn } from '@vueuse/shared'
// import { useEventListener } from '../useEventListener'

const DEFAULT_PING_MESSAGE = 'ping'
export type WebSocketStatus = "OPEN" | "CONNECTING" | "CLOSED";
export interface UseWebSocketOptions {
  onConnected?: (ws: WebSocket) => void;
  onDisconnected?: (ws: WebSocket, event: CloseEvent) => void;
  onError?: (ws: WebSocket, event: Event) => void;
  onMessage?: (ws: WebSocket, event: MessageEvent) => void;
  heartbeat?:
    | boolean
    | {
        message?: string | ArrayBuffer | Blob;
        interval?: number;
        pongTimeout?: number;
      };
  autoReconnect?:
    | boolean
    | {
        retries?: number | (() => boolean);
        delay?: number;
        onFailed?: any;
      };
  immediate?: boolean;
  autoClose?: boolean;
  protocols?: string[];
}

export interface UseWebSocketReturn<T> {
  data: Ref<T | null>;
  status: Ref<WebSocketStatus>;
  close: WebSocket["close"];
  open: any;
  send: (data: string | ArrayBuffer | Blob, useBuffer?: boolean) => boolean;
  ws: Ref<WebSocket | undefined>;
}

function resolveNestedOptions<T>(options: T | true): T {
  if (options === true) return {} as T;
  return options;
}

export function useWebSocket<Data = any>(url: any, options: any): any {
  const {
    onConnected,
    onDisconnected,
    onError,
    onMessage,
    immediate = true,
    autoClose = true,
    protocols = [],
  } = options;

  const data: Ref<Data | null> = ref(null);
  const status = ref<WebSocketStatus>("CLOSED");
  const wsRef = ref<WebSocket | undefined>();
  const urlRef = ref(url);

  let heartbeatPause: any | undefined;
  let heartbeatResume: any | undefined;

  let explicitlyClosed = false;
  let retried = 0;

  let bufferedData: (string | ArrayBuffer | Blob)[] = [];

  let pongTimeoutWait: ReturnType<typeof setTimeout> | undefined;

  const close: WebSocket["close"] = (code = 1000, reason) => {
    if (!wsRef.value) return;
    explicitlyClosed = true;
    heartbeatPause?.();
    wsRef.value.close(code, reason);
  };

  const _sendBuffer = () => {
    if (bufferedData.length && wsRef.value && status.value === "OPEN") {
      for (const buffer of bufferedData) {
        wsRef.value.send(buffer);
      }
      bufferedData = [];
    }
  };

  const resetHeartbeat = () => {
    clearTimeout(pongTimeoutWait);
    pongTimeoutWait = undefined;
  };

  const send = (data: string | ArrayBuffer | Blob, useBuffer = true) => {
    if (!wsRef.value || status.value !== "OPEN") {
      if (useBuffer) bufferedData.push(data);
      return false;
    }
    _sendBuffer();
    wsRef.value.send(data);
    return true;
  };

  const _init = () => {
    if (explicitlyClosed || typeof urlRef.value === "undefined") return;

    const ws = new WebSocket(urlRef.value, protocols);
    wsRef.value = ws;
    status.value = "CONNECTING";

    ws.onopen = () => {
      status.value = "OPEN";
      onConnected?.(ws!);
      heartbeatResume?.();
      _sendBuffer();
    };

    ws.onclose = (ev) => {
      status.value = "CLOSED";
      wsRef.value = undefined;
      onDisconnected?.(ws, ev);

      if (!explicitlyClosed && options.autoReconnect) {
        const {
          retries = -1,
          delay = 1000,
          onFailed,
        } = resolveNestedOptions(options.autoReconnect);
        retried += 1;

        if (typeof retries === "number" && (retries < 0 || retried < retries))
          setTimeout(_init, delay);
        else if (typeof retries === "function" && retries())
          setTimeout(_init, delay);
        else onFailed?.();
      }
    };

    ws.onerror = (e) => {
      onError?.(ws!, e);
    };

    ws.onmessage = (e: MessageEvent) => {
      if (options.heartbeat) {
        resetHeartbeat();
        const { message = DEFAULT_PING_MESSAGE } = resolveNestedOptions(
          options.heartbeat
        );
        if (e.data === message) return;
      }

      data.value = e.data;
      onMessage?.(ws!, e);
    };
  };

  if (options.heartbeat) {
    const {
      message = DEFAULT_PING_MESSAGE,
      interval = 1000,
      pongTimeout = 1000,
    } = resolveNestedOptions(options.heartbeat);

    const { pause, resume } = useIntervalFn(
      () => {
        send(message, false);
        if (pongTimeoutWait != null) return;
        pongTimeoutWait = setTimeout(() => {
          // auto-reconnect will be trigger with ws.onclose()
          close();
        }, pongTimeout);
      },
      interval,
      { immediate: false }
    );

    heartbeatPause = pause;
    heartbeatResume = resume;
  }

  if (autoClose) {
    // useEventListener(window, 'beforeunload', () => close())
    // tryOnScopeDispose(close)
  }

  const open = () => {
    close();
    explicitlyClosed = false;
    retried = 0;
    _init();
  };

  if (immediate) watch(urlRef, open, { immediate: true });

  return {
    data,
    status,
    close,
    send,
    open,
    ws: wsRef,
  };
}
