import { CheckboxOptionType } from 'antd';

export class DataTableModel {
  name?: string;
  title?: string;
  tableItem?: TableItem;
}

export class TableItem {
  filter?: TableItemFilter;
  width?: number;
  fixed?: boolean;
  sorter?: boolean;
  onCell?: () => { style: any; onClick?: any };
  align?: 'left' | 'right' | 'center' | null;
  onClick?: any;
  render?: (text: any, item: any) => JSX.Element | string;
}

export class TableItemFilter {
  type?: 'search' | 'checkbox' | 'radio' | 'date';
  list?: TableItemFilterList[];
  get?: TableGet;
  name?: string;
}

export class TableGet {
  facade?: any;
  format?: (item: any) => CheckboxOptionType;
  params?: (fullTextSearch: string, value?: any) => any;
}

export class TableItemFilterList {
  label?: string;
  value?: string | number;
}
export class TableRefObject {
  onChange?: (request?: any) => void;
  handleDelete?: (id: string) => void;
}
