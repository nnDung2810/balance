import { CheckboxOptionType, FormInstance } from 'antd';
import { TableGet } from '../data-table';

export class FormModel {
  name?: string;
  title?: any;
  formItem?: FormItem;
}

export class FormItem {
  type?:
    | 'hidden'
    | 'number'
    | 'tab'
    | 'addable'
    | 'editor'
    | 'upload'
    | 'table_transfer'
    | 'password'
    | 'textarea'
    | 'slider'
    | 'slider_number'
    | 'date'
    | 'date_range'
    | 'checkbox'
    | 'radio'
    | 'tag'
    | 'chips'
    | 'select'
    | 'tree_select'
    | 'switch'
    | 'layout';
  col?: number;
  condition?: (value: string, form: FormInstance, index: number, values: any) => boolean;
  list?: CheckboxOptionType[];
  rules?: FormItemRule[];
  mode?: 'multiple' | 'tags';
  tab?: FormItemTab;
  column?: FormModel[];
  disabled?: (values: any, form?: FormInstance) => boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  sliderMarks?: Record<number, string>;
  symbol?: string;
  initialValues?: { start: string; end: string };
  convert?: (data: any) => any;
  onChange?: (value: any, form: FormInstance, reRender: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>, form: FormInstance, name: string) => void;
  disabledDate?: (current: any, form: FormInstance) => boolean;
  showTime?: boolean;
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  onCalendarChange?: (current: any, form: FormInstance, reRender: any) => void;
  api?: FormApi;
  get?: TableGet;
  label?: string;
  maxTagCount?: number;
  tag?: {
    avatar: string;
    label: string;
    value: string;
    params: (getFieldValue: any, fullTextSearch: string, value: any) => any;
    api: string;
  };
  showSearch?: boolean;
  mask?: any;
  addonBefore?: (form: FormInstance) => JSX.Element;
  addonAfter?: (form: FormInstance) => JSX.Element;
  maxLength?: number;
  textAdd?: string;
  onAdd?: (values: any, form: FormInstance) => void;
  isTable?: boolean;
  showRemove?: any;
  idCheck?: any;
  tabIndex?: number;
}
export class FormItemList {
  label?: string | JSX.Element;
  value: any;
  checked?: boolean;
}

export class FormItemRule {
  type?: string;
  message?: string;
  value?: any;
  validator?: ({ getFieldValue }: any) => { validator(rule: any, value: string): Promise<void> };
  min?: number;
  max?: number;
}

export class FormItemTab {
  label?: string;
  value: any;
  disabled?: boolean;
}
export class FormApi {
  link?: () => string;
  format?: (item: any) => CheckboxOptionType;
  params?: (form: FormInstance, fullTextSearch: string) => any;
}

export class FormModalRefObject {
  handleEdit?: (item?: { id?: string }, isGet?: boolean) => Promise<void>;
  handleDelete?: (id: string) => Promise<any>;
  form?: FormInstance<any>;
}
