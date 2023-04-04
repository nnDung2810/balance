import React, { useState, useEffect } from 'react';
import { FormInstance, Select } from 'antd';

import { useAppDispatch, useTypedSelector } from '@reducers';
import { TableGet } from '@models';
import { cleanObjectKeyNull } from '@utils';

const Component = ({
  formItem,
  form,
  value,
  showSearch = true,
  maxTagCount,
  onChange,
  placeholder,
  disabled,
  tabIndex,
  get,
  ...prop
}: Type) => {
  const [_list, set_list] = useState(formItem.list ? formItem.list : []);
  const dispatch = useAppDispatch();
  const { result, queryParams, time, isLoading } = useTypedSelector((state: any) => state[get?.action?.name || 'User']);
  const list = !get ? _list : result.data?.map(formItem.get.format).filter((item: any) => !!item.value);
  const loadData = async (fullTextSearch: string) => {
    if (get) {
      const params = formItem.get.params
        ? formItem.get.params(form.getFieldValue, fullTextSearch, value)
        : { fullTextSearch };
      if (!result.data || new Date().getTime() > time || JSON.stringify(cleanObjectKeyNull(params)) != queryParams) {
        dispatch(get.action.get(cleanObjectKeyNull(params)));
      }
    } else if (formItem.renderList) {
      set_list(formItem.renderList(form.getFieldValue, fullTextSearch, formItem.list));
    } else if (formItem.list) {
      set_list(
        formItem.list.filter(
          (item: any) =>
            !item?.label?.toUpperCase || item?.label?.toUpperCase().indexOf(fullTextSearch.toUpperCase()) > -1,
        ),
      );
    }
  };

  useEffect(() => {
    if (!isLoading) {
      loadData('');
    }
  }, []);

  return (
    <Select
      tabIndex={tabIndex}
      maxTagCount={maxTagCount}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      {...prop}
      listHeight={200}
      filterOption={false}
      showSearch={showSearch}
      allowClear
      // onBlur={() => loadData('')}
      onSearch={(value) => loadData(value)}
      value={value}
      maxTagPlaceholder={(array) => '+' + array.length}
      mode={formItem.mode}
      optionFilterProp="label"
      onSelect={(value) => formItem?.onSelect && formItem?.onSelect(value, form)}
    >
      {formItem &&
        list?.map((item: any, index: number) => (
          <Select.Option key={`${item.value}${index}`} value={item.value} disabled={item.disabled}>
            {item.label}
          </Select.Option>
        ))}
    </Select>
  );
};
type Type = {
  formItem: any;
  form: FormInstance;
  value?: any;
  showSearch?: boolean;
  maxTagCount: number | 'responsive';
  onChange: (e: any) => any;
  placeholder: string;
  disabled: boolean;
  tabIndex: number;
  get?: TableGet;
};
export default Component;
