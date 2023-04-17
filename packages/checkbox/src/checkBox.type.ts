export interface checkBoxProps {
  indeterminate?: boolean; //半选
  checked?: boolean;
  name?: string;
  disabled?: boolean;
  label?: string | number | boolean | object;
  modelValue?: string | number | boolean;
}

import { ComputedRef } from "vue";

export interface IGroupProvide {
  modelValue?: ComputedRef;
  handChange?: (val: unknown) => void;
  min?: number;
  max?: number;
}
