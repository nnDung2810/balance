import React, { forwardRef, Fragment, Ref, useEffect, useImperativeHandle, useRef } from 'react';
import { v4 } from 'uuid';
import { Checkbox, CheckboxOptionType, DatePicker, Popover, Radio, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import dayjs from 'dayjs';
import classNames from 'classnames';

import { Button } from '@components/button';
import { Pagination } from '@components/pagination';
import { DataTableModel, PaginationQuery, TableGet, TableRefObject } from '@models';
import { cleanObjectKeyNull, routerLinks } from '@utils';
import { Calendar, CheckCircle, CheckSquare, Search, Times } from '@svgs';
import { SorterResult } from 'antd/lib/table/interface';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const checkTextToShort = (text: string) => {
  return text?.length < 50 ? (
    text
  ) : (
    <span>
      {text?.substring(0, 40)}
      <Popover trigger="hover" overlayClassName="table-tooltip" content={text}>
        ...
      </Popover>
    </span>
  );
};

const getQueryStringParams = (query: string) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params: { [selector: string]: string }, param: string) => {
        const [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {})
    : {}; // Trim - from end of text
};

export const DataTable = forwardRef(
  (
    {
      columns = [],
      showList = true,
      footer,
      defaultRequest = {
        page: 1,
        perPage: 10,
      },
      showPagination = true,
      leftHeader,
      rightHeader,
      showSearch = true,
      save = true,
      searchPlaceholder,
      subHeader,
      xScroll,
      yScroll,
      emptyText = 'No Data',
      onRow,
      pageSizeOptions = [10, 20, 30, 40],
      pageSizeRender = (sizePage: number) => sizePage + ' / page',
      pageSizeWidth = '115px',
      paginationDescription = (from: number, to: number, total: number) => from + '-' + to + ' of ' + total + ' items',
      idElement = 'temp-' + v4(),
      className = 'data-table',
      facade = {},
      data,
      ...prop
    }: Type,
    ref: Ref<TableRefObject>,
  ) => {
    useImperativeHandle(ref, () => ({
      onChange,
      handleDelete: async (id: string) => facade.delete(id),
    }));
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const idTable = useRef(idElement);
    const param = useRef(defaultRequest);
    const timeoutSearch = useRef<ReturnType<typeof setTimeout>>();
    const cols = useRef<DataTableModel[]>();
    const { result, isLoading, queryParams, time } = facade;
    const params =
      save && location.search && location.search.indexOf('=') > -1
        ? { ...param.current, ...getQueryStringParams(location.search) }
        : param.current;
    useEffect(() => {
      if (facade) {
        param.current = cleanObjectKeyNull({
          ...params,
          sorts: JSON.stringify(params.sorts),
          filter: JSON.stringify(params.filter),
        });
        localStorage.setItem(idTable.current, JSON.stringify(cleanObjectKeyNull(param.current)));
        if (!result?.data || new Date().getTime() > time || JSON.stringify(param.current) != queryParams)
          onChange(param.current);
      }
      return () => {
        localStorage.removeItem(idTable.current);
      };
    }, []);

    const onChange = (request?: PaginationQuery) => {
      if (request) {
        localStorage.setItem(idTable.current, JSON.stringify(request));
        param.current = { ...request };
        if (save) {
          if (request.sorts && typeof request.sorts === 'object') {
            request.sorts = JSON.stringify(request.sorts);
          }
          if (request.filter && typeof request.filter === 'object') {
            request.filter = JSON.stringify(request.filter);
          }
          navigate(location.pathname + '?' + new URLSearchParams(request as Record<string, string>).toString());
        }
      } else if (localStorage.getItem(idTable.current)) {
        param.current = JSON.parse(localStorage.getItem(idTable.current) || '{}');
      }

      if (showList && facade?.get) {
        facade?.get(cleanObjectKeyNull({ ...param.current }));
      }
    };

    if (params.filter && typeof params.filter === 'string') {
      params.filter = JSON.parse(params.filter);
    }
    if (params.sorts && typeof params.sorts === 'string') {
      params.sorts = JSON.parse(params.sorts);
    }

    const groupButton = (confirm: any, clearFilters: any, key: any, value: any) => (
      <div className="grid grid-cols-2 gap-2 mt-1">
        <Button
          text={t('components.datatable.reset')}
          onClick={() => {
            clearFilters();
            confirm();
          }}
          className={'justify-center'}
        />
        <Button
          icon={<Search className="fill-white h-4 w-4" />}
          text={t('components.datatable.search')}
          onClick={() => confirm(value)}
          className={'justify-center'}
        />
      </div>
    );
    const valueFilter = useRef<{ [selector: string]: boolean }>({});
    const columnSearch = (get: TableGet, fullTextSearch = '', value?: any, facade: any = {}) => {
      if (get?.facade) {
        const params = get.params ? get.params(fullTextSearch, value) : { fullTextSearch };
        if (new Date().getTime() > facade.time || JSON.stringify(cleanObjectKeyNull(params)) != facade.queryParams) {
          facade.get(cleanObjectKeyNull(params));
        }
      }
    };
    // noinspection JSUnusedGlobalSymbols
    const getColumnSearchRadio = (filters: CheckboxOptionType[], key: string, get: TableGet = {}) => ({
      onFilterDropdownOpenChange: async (visible: boolean) => (valueFilter.current[key] = visible),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
        const facade = get?.facade ? get?.facade() : {};
        useEffect(() => {
          if (get && !facade?.result?.data && valueFilter.current[key]) {
            columnSearch(get, '', undefined, facade);
          }
        }, [valueFilter.current[key]]);
        return (
          <div className={'p-1'}>
            <input
              className="w-full sm:w-52 h-10 rounded-xl text-gray-600 bg-white border border-solid border-gray-100 pr-9 pl-4 mb-1"
              type="text"
              placeholder={t('components.datatable.pleaseEnterValueToSearch') || ''}
              onChange={(e) => {
                clearTimeout(timeoutSearch.current);
                timeoutSearch.current = setTimeout(() => columnSearch(get, e.target.value, selectedKeys), 500);
              }}
              onKeyUp={async (e) => {
                if (e.key === 'Enter') {
                  await columnSearch(get, e.currentTarget.value, undefined, facade);
                }
              }}
            />
            <div>
              <RadioGroup
                options={
                  filters || get?.facade?.result?.data?.map(get.format).filter((item: any) => !!item.value) || []
                }
                value={selectedKeys}
                onChange={(e) => setSelectedKeys(e.target.value + '')}
              />
            </div>
            {groupButton(confirm, clearFilters, key, selectedKeys)}
          </div>
        );
      },
      filterIcon: () => <CheckCircle className="h-4 w-4 fill-orange-400" />,
    });
    cols.current = columns
      .filter((col: DataTableModel) => !!col && !!col.tableItem)
      .map((col: DataTableModel) => {
        let item = col.tableItem;

        if (item?.filter) {
          const filter = params?.filter as any;
          switch (item?.filter?.type) {
            case 'radio':
              item = {
                ...item,
                ...getColumnSearchRadio(
                  item.filter.list as CheckboxOptionType[],
                  item.filter.name || col!.name!,
                  item.filter.get,
                ),
              };
              break;
            case 'checkbox':
              item = {
                ...item,

              };
              break;
            case 'date':
              break;
            default:
          }
        }
        if (!item?.render) {
          item!.render = (text: string) => text && checkTextToShort(text);
        }
        // noinspection JSUnusedGlobalSymbols
        return {
          title: col.title,
          dataIndex: col.name,
          ...item,
        };
      });

    const handleTableChange = (
      pagination?: { page?: number; perPage?: number },
      filters = {},
      sorts?: SorterResult<any>,
      tempFullTextSearch?: string,
    ) => {
      let tempPageIndex = pagination?.page || params.page;
      const tempPageSize = pagination?.perPage || params.perPage;

      const tempSort =
        sorts && sorts?.field && sorts?.order
          ? {
            [sorts.field as string]: sorts.order === 'ascend' ? 'ASC' : sorts.order === 'descend' ? 'DESC' : '',
          }
          : sorts?.field
            ? null
            : sorts;

      if (tempFullTextSearch !== params.fullTextSearch) {
        tempPageIndex = 1;
      }
      const tempParams = cleanObjectKeyNull({
        ...params,
        page: tempPageIndex,
        perPage: tempPageSize,
        sorts: JSON.stringify(tempSort),
        //filter: JSON.stringify(cleanObjectKeyNull(filters)),
        fullTextSearch: tempFullTextSearch,
      });
      onChange && onChange(tempParams);
    };
    if (!data) data = result?.data;
    return (
      <div className={classNames(className, 'intro-x bg-white p-3 rounded-lg')}>
        <div className="sm:flex justify-between py-2 ">
          {showSearch ? (
            <div className="relative">
              <input
                id={idTable.current + '_input_search'}
                className="w-full sm:w-80 h-10 rounded-xl text-gray-600 bg-white border border-solid border-gray-500 pr-9 pl-8"
                defaultValue={params.fullTextSearch}
                type="text"
                placeholder={searchPlaceholder || (t('components.datatable.pleaseEnterValueToSearch') as string)}
                onChange={() => {
                  clearTimeout(timeoutSearch.current);
                  timeoutSearch.current = setTimeout(() => {
                    handleTableChange(
                      undefined,
                      params.filter,
                      params.sorts as SorterResult<any>,
                      (document.getElementById(idTable.current + '_input_search') as HTMLInputElement).value,
                    );
                  }, 500);
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleTableChange(
                      undefined,
                      params.filter,
                      params.sorts as SorterResult<any>,
                      (document.getElementById(idTable.current + '_input_search') as HTMLInputElement).value,
                    );
                  }
                }}
              />
              {!params.fullTextSearch ? (
                <Search
                  className="w-5 h-5 my-1 fill-gray-500 text-lg bg-blue-50 las absolute top-1.5 left-3 z-10"
                  onClick={() => {
                    if (params.fullTextSearch) {
                      (document.getElementById(idTable.current + '_input_search') as HTMLInputElement).value = '';
                      handleTableChange(undefined, params.filter, params.sorts as SorterResult<any>, '');
                    }
                  }}
                />
              ) : (
                !!params.fullTextSearch && (
                  <Times
                    className="w-5 h-5 my-1 fill-gray-600 text-lg las absolute top-1.5 right-3 z-10"
                    onClick={() => {
                      if (params.fullTextSearch) {
                        (document.getElementById(idTable.current + '_input_search') as HTMLInputElement).value = '';
                        handleTableChange(undefined, params.filter, params.sorts as SorterResult<any>, '');
                      }
                    }}
                  />
                )
              )}
            </div>
          ) : (
            <div />
          )}
          {!!leftHeader && <div className={'mt-2 sm:mt-0'}>{leftHeader}</div>}
          {!!rightHeader && <div className={'mt-2 sm:mt-0'}>{rightHeader}</div>}
        </div>
        {subHeader && subHeader(result?.count)}
        {!!showList && (
          <Fragment>
            <Table
              className='p-3 border rounded-2xl'
              onRow={() => ({ onDoubleClick: () => navigate(routerLinks('User/Edit')) })}
              locale={{
                emptyText: (
                  <div className="bg-gray-100 text-gray-400 py-4">
                    {t(`components.datatable.${emptyText}`)}</div>
                ),
              }}
              loading={isLoading}
              columns={cols.current}
              pagination={false}
              dataSource={data?.map((item: any) => ({
                ...item,
                key: item.id || v4(),
              }))}
              showSorterTooltip={false}
              scroll={{ x: xScroll, y: yScroll }}
              size="small"
              {...prop}
            />
            {showPagination && (
              <Pagination
                total={result?.pagination?.total}
                page={+params.page}
                perPage={+params.perPage}
                pageSizeOptions={pageSizeOptions}
                pageSizeRender={pageSizeRender}
                pageSizeWidth={pageSizeWidth}
                queryParams={(pagination: { page?: number; perPage?: number }) =>
                  handleTableChange(pagination, params.filter, params.sorts as SorterResult<any>, params.fullTextSearch)
                }
                paginationDescription={paginationDescription}
                idElement={idTable.current}
                {...prop}
              />
            )}
          </Fragment>
        )}
        {!!footer && <div className="footer">{footer(result)}</div>}
      </div>
    );
  },
);
DataTable.displayName = 'HookTable';
type Type = {
  columns: DataTableModel[];
  showList?: boolean;
  footer?: (result: any) => any;
  defaultRequest?: any;
  pageIndex?: string;
  pageSize?: string;
  type?: string;
  sort?: string;
  filter?: string;
  fullTextSearch?: string;
  showPagination?: boolean;
  leftHeader?: JSX.Element;
  rightHeader?: JSX.Element;
  showSearch?: boolean;
  save?: boolean;
  searchPlaceholder?: string;
  subHeader?: (count: number) => any;
  xScroll?: string | number | true;
  yScroll?: string | number;
  emptyText?: JSX.Element | string;
  onRow?: (data: any) => { onDoubleClick: () => void };
  pageSizeOptions?: number[];
  pageSizeRender?: (sizePage: number) => number | string;
  pageSizeWidth?: string;
  paginationDescription?: (from: number, to: number, total: number) => string;
  idElement?: string;
  className?: string;
  facade?: any;
  data?: any[];
};
