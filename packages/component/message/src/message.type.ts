export type Itype = "success" | "info" | "error" | "warning";

export interface ImessageProps {
  id?: string;
  message?: string;
  type?: Itype;
  duration?: number;
  center?: boolean;
  onclose?: () => void;
  offset?: number;
  grouping?: boolean;
}

export type ImessageOptions = ImessageProps | string;

export interface MessageHandler {
  close: () => void;
}
