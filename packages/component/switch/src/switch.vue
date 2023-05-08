<!--
 * @Author: liangweibin
 * @Date: 2023-05-05 16:22:40
 * @LastEditors: liangweibin
 * @LastEditTime: 2023-05-05 17:20:14
 * @Description: 
-->
<!-- aria属性  role属性       css :outline: none;    user-select: none;   节点ref 什么时候输出RefImpl  

dynamicChildren
dynamicProps
这两个属性是干嘛的
-->
<template>
  <div
    :class="[
      'tp-switch',
      checked ? 'is-checked' : '',
      switchDisabled ? 'is-disabled' : '',
    ]"
    @click.prevent="switchValue"
  >
    <span
      v-if="!inlinePrompt && (inactiveIcon || inactiveText)"
      :class="['tp-switch__label', !checked ? 'is-active' : '']"
    >
      <tp-icon v-if="inactiveIcon">
        <component :is="inactiveIcon" />
      </tp-icon>
      <span
        v-if="!inactiveIcon && inactiveText"
        class="tp-switch__label--left"
        >{{ inactiveText }}</span
      >
    </span>
    <input
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="disabled"
      :aria-checked="checked"
      :aria-disabled="switchDisabled"
      ref="input"
      type="checkbox"
      role="switch"
      class="tp-switch__input"
      @change="handleChange"
    />
    <span class="tp-switch__core" :style="['width:' + width + 'px']">
      <div v-if="inlinePrompt" class="tp-switch__inner">
        <template v-if="activeIcon || inactiveIcon">
          <div class="is-icon">
            <component :is="checked ? activeIcon : inactiveIcon" />
          </div>
        </template>
        <template v-else-if="activeText || inactiveText">
          <span class="is-text" :aria-hidden="!checked">
            {{ checked ? activeText : inactiveText }}
          </span>
        </template>
      </div>
      <div class="tp-switch__action">
        <tp-icon
          v-if="loading"
          name="Loading"
          :class="[loading ? 'is-disabled' : '']"
        >
        </tp-icon>
      </div>
    </span>
    <span
      v-if="!inlinePrompt && (activeIcon || activeText)"
      :class="['tp-switch__label ', checked ? 'is-active' : '']"
    >
      <tp-icon v-if="activeIcon">
        <component :is="activeIcon" />
      </tp-icon>
      <span v-if="!activeIcon && activeText" class="tp-switch__label--right">{{
        activeText
      }}</span>
    </span>
  </div>
</template>
<script lang="ts">
// ----------copy过来的函数工具
export const UPDATE_MODEL_EVENT = "update:modelValue";
export const CHANGE_EVENT = "change";
export const INPUT_EVENT = "input";

class ElementPlusError extends Error {
  constructor(m: string) {
    super(m);
    this.name = "ElementPlusError";
  }
}
// declare const isPromise: <T = any>(val: unknown) => val is Promise<T>;
// declare const isBoolean: (val: any) => val is boolean;

export function throwError(scope: string, m: string): never {
  throw new ElementPlusError(`[${scope}] ${m}`);
}
function isPromise(value) {  
  return value instanceof Promise || value.constructor === Promise;  
}

function isBoolean(value) {    
  return value === true || value === false;    
}

// -----------------
import {
  defineComponent,
  ref,
  watch,
  nextTick,
  getCurrentInstance,
  computed,
  onMounted,
} from "vue";
const COMPONENT_NAME = "tp-switch";
export default defineComponent({
  name: COMPONENT_NAME,
  emits: ["update:modelValue", "change", "input"],
  props: {
    width: {
      type: [String, Number],
      default: "",
    },
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    activeText: {
      type: String,
      default: "",
    },
    inactiveText: {
      type: String,
      default: "",
    },
    inlinePrompt: {
      type: Boolean,
      default: false,
    },
    activeIcon: {
      type: String as any,
    },
    inactiveIcon: {
      type: String as any,
    },
    beforeChange: {
      type: Function,
    },
  },
  setup(props) {
    const { emit } = getCurrentInstance();

    const isControlled = ref(props.modelValue !== false);
    const input = ref<HTMLInputElement>();

    watch(
      () => props.modelValue,
      (val) => {
        console.log(val);
        console.log(props);

        isControlled.value = true;
      }
    );
    watch(
      () => props.value,
      () => {
        isControlled.value = false;
      }
    );
    const actualValue = computed(() => {
      return isControlled.value ? props.modelValue : props.value;
    });

    const checked = computed(() => actualValue.value === props.activeValue);

    // 如果包含就直接默认是关闭的状态 inactiveValue
    if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
      emit(UPDATE_MODEL_EVENT, props.inactiveValue);
      emit(CHANGE_EVENT, props.inactiveValue);
      emit(INPUT_EVENT, props.inactiveValue);
    }

    const handleChange = () => {
      console.log(1111111111);
      const val = checked.value ? props.inactiveValue : props.activeValue;
      console.log(checked.value, "checked.value");
      console.log(val, "val");
      emit(UPDATE_MODEL_EVENT, val);
      emit(CHANGE_EVENT, val);
      emit(INPUT_EVENT, val);
      nextTick(() => {
        input.value!.checked = checked.value as any;
      });
    };
    const switchDisabled = computed(() => props.disabled || props.loading);

    const switchValue = () => {
      if (switchDisabled.value) return;

      const { beforeChange } = props;
      if (!beforeChange) {
        handleChange();
        return;
      }
      console.log(beforeChange, "beforeChange");

      const shouldChange = beforeChange();

      const isPromiseOrBool = [
        isPromise(shouldChange),
        isBoolean(shouldChange),
      ].includes(true);
      if (!isPromiseOrBool) {
        throwError(
          COMPONENT_NAME,
          "beforeChange must return type `Promise<boolean>` or `boolean`"
        );
      }

      if (isPromise(shouldChange)) {
        shouldChange
          .then((result) => {
            if (result) {
              handleChange();
            }
          })
          .catch((e) => {
            console.warn(COMPONENT_NAME, `some error occurred: ${e}`);
          });
      } else if (shouldChange) {
        handleChange();
      }
    };

    onMounted(() => {
      input.value!.checked = checked.value;
      console.log(input.value);
    });
    watch(checked, (val: any) => {
      console.log(input, val);
      input.value!.checked = val;
      console.log(input, val);
    });

    return {
      input,
      checked,
      handleChange,
      switchValue,
      switchDisabled,
    };
  },
});
</script>