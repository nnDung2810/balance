import React, { useState, useEffect, useCallback } from 'react';
import { FormInstance, Select } from 'antd';
import { API } from '@utils';

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
  ...prop
}: Type) => {
  const [_list, set_list] = useState(formItem.list ? formItem.list : []);

  const loadData = useCallback(
    async (fullTextSearch: string) => {
      if (formItem.api) {
        if (!formItem.api.condition || formItem.api.condition(form.getFieldValue)) {
          const url = formItem.api.link(form.getFieldValue);
          if (url) {
            const params = formItem.api.params
              ? formItem.api.params(form.getFieldValue, fullTextSearch, value)
              : { fullTextSearch };
            const data = await API.get(url, params);
            set_list(data.data.map(formItem.api.format).filter((item: any) => !!item.value));
          }
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
    },
    [form, formItem, value],
  );

  useEffect(() => {
    loadData('');
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
        _list.map((item: any, index: number) => (
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
};
export default Component;
