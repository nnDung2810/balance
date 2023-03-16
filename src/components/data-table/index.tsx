import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useCallback,
  forwardRef,
  useImperativeHandle,
  Dispatch,
  SetStateAction,
} from 'react';
import { v4 } from 'uuid';
import { Table, Radio, Checkbox, DatePicker, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import dayjs from 'dayjs';
import classNames from 'classnames';
// @ts-ignore
import { Resizable } from 'react-resizable';

import { Button, Pagination } from '@components';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const checkTextToShort = (text: string) => {
  return text?.length < 50 || typeof text !== 'string' ? (
    text
  ) : (
    <span>
      {text?.substring(0, 40)}
      <Popover trigger="hover" overlayClassName="table-tooltip" content={text}>
        <i className="las la-lg la-info-circle link-click" />
      </Popover>
    </span>
  );
};
const cleanObjectKeyNull = (obj: any) => {
  for (const propName in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, propName)) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }
  return obj;
};
const getQueryStringParams = (query: any) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params: any, param: any) => {
        const [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {})
    : {}; // Trim - from end of text
};
const ResizableTitle = ({
  onResize,
  width,
  minWidth,
  ...restProps
}: {
  onResize: any;
  width: number;
  minWidth: number;
}) => {
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      minConstraints={[minWidth, 0]}
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const Hook = forwardRef(
  (
    {
      columns = [],
      isLoading,
      setIsLoading,
      Get,
      id = () => true,
      showList = true,
      footer,
      defaultRequest = {},
      pageIndex = 'page',
      pageSize = 'perPage',
      sort = 'sorts',
      filter = 'filter',
      fullTextSearch = 'fullTextSearch',
      showPagination = true,
      leftHeader,
      rightHeader,
      showSearch = true,
      save = true,
      searchPlaceholder,
      subHeader,
      xScroll,
      yScroll,
      emptyText = <div>No Data</div>,
      onRow,
      pageSizeOptions = [10, 20, 30, 40],
      pageSizeRender = (sizePage: number) => sizePage + ' / page',
      pageSizeWidth = '115px',
      paginationDescription = (from: number, to: number, total: number) => from + '-' + to + ' of ' + total + ' items',
      idElement = 'temp-' + v4(),
      className = 'data-table',
      data = [],
      count = 0,
      ...prop
    }: Type,
    ref,
  ) => {
    useImperativeHandle(ref, () => ({ onChange, params }));

    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const [idTable] = useState('temp-' + v4());
    const [objData, set_objData] = useState({ data, count });
    const idE: any = useRef(idElement);
    const param = useRef(
      localStorage.getItem(idTable)
        ? JSON.parse(localStorage.getItem(idTable) || '{}')
        : {
            [pageIndex]: 1,
            [pageSize]: 10,
            ...defaultRequest,
          },
    );
    const timeoutSearch = useRef<any>();
    const cols = useRef<any>();

    useEffect(() => {
      return () => {
        localStorage.removeItem(idTable);
      };
    }, [idTable]);

    useEffect(() => {
      param.current = cleanObjectKeyNull({
        ...params,
        [sort]: JSON.stringify(params[sort]),
        [filter]: JSON.stringify(params[filter]),
      });
      localStorage.setItem(idTable, JSON.stringify(cleanObjectKeyNull(param.current)));
    }, []);

    const onChange = useCallback(
      async (request: any) => {
        if (request) {
          localStorage.setItem(idTable, JSON.stringify(request));
          param.current = { ...request };
          if (save) {
            if (request[sort] && typeof request[sort] === 'object') {
              request[sort] = JSON.stringify(request[sort]);
            }
            if (request[filter] && typeof request[filter] === 'object') {
              request[filter] = JSON.stringify(request[filter]);
            }
            navigate(location.pathname + '?' + new URLSearchParams(request).toString());
          }
        } else if (localStorage.getItem(idTable)) {
          param.current = JSON.parse(localStorage.getItem(idTable) || '{}');
        }

        if (showList && Get) {
          setIsLoading && setIsLoading(true);
          const prop = await Get(param.current, id());
          if (prop.data.length === 0 && param.current[pageIndex] > 1) {
            await onChange({
              ...param.current,
              page: param.current[pageIndex] - 1,
            });
          } else {
            set_objData(prop);
            setIsLoading && setIsLoading(false);
          }
        } else {
          setIsLoading && setIsLoading(false);
        }
      },
      [id, showList],
    );

    const params =
      save && location.search && location.search.indexOf('=') > -1
        ? { ...param.current, ...getQueryStringParams(location.search) }
        : param.current;

    if (params[filter] && typeof params[filter] === 'string') {
      params[filter] = JSON.parse(params[filter]);
    }
    if (params[sort] && typeof params[sort] === 'string') {
      params[sort] = JSON.parse(params[sort]);
    }

    const groupButton = (confirm: any, clearFilters: any, key: any, value: any, setSelectedKeys: any) => (
      <div className="grid grid-cols-2 gap-2 mt-1">
        <Button
          text={t('components.datatable.reset')}
          onClick={() => {
            setSelectedKeys(undefined);
            confirm(undefined);
          }}
          className={'justify-center'}
        />
        <Button
          icon={'las la-search'}
          text={t('components.datatable.search')}
          onClick={() => confirm(value)}
          className={'justify-center'}
        />
      </div>
    );
    const refInput = useRef<any>();
    // noinspection JSUnusedGlobalSymbols
    const getColumnSearchInput = (key: any) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div className="p-1">
          <input
            className="w-full h-10 rounded-xl text-gray-600 bg-white border border-solid border-gray-100 pr-9 pl-4"
            value={selectedKeys}
            type="text"
            placeholder={t('components.datatable.pleaseEnterValueToSearch') || ''}
            onChange={(e) => setSelectedKeys(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                confirm();
              }
              e.stopPropagation();
            }}
          />
          {groupButton(confirm, clearFilters, key, selectedKeys, setSelectedKeys)}
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <i className="las la-lg la-search" style={{ color: filtered ? '#3699FF' : undefined }} />
      ),
      onFilterDropdownOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => refInput.current.select());
        }
      },
    });
    // noinspection JSUnusedGlobalSymbols
    const getColumnSearchRadio = (filters: any, key: any) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div className={'p-1'}>
          <RadioGroup options={filters} value={selectedKeys} onChange={(e) => setSelectedKeys(e.target.value + '')} />
          {groupButton(confirm, clearFilters, key, selectedKeys, setSelectedKeys)}
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <i className="las la-lg la-dot-circle" style={{ color: filtered ? '#3699FF' : undefined }} />
      ),
    });
    // noinspection JSUnusedGlobalSymbols
    const getColumnSearchCheckbox = (filters: any, key: any) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div className={'p-1'}>
          <CheckboxGroup options={filters} value={selectedKeys} onChange={(e) => setSelectedKeys(e)} />
          {groupButton(confirm, clearFilters, key, selectedKeys, setSelectedKeys)}
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <i className="las la-lg la-check-square" style={{ color: filtered ? '#3699FF' : undefined }} />
      ),
    });
    // noinspection JSUnusedGlobalSymbols
    const getColumnSearchDate = (key: any) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div className={'p-1'}>
          <RangePicker
            renderExtraFooter={() => (
              <Button
                icon={'las la-check-circle'}
                text={t('components.datatable.ok')}
                onClick={() => (document.activeElement as HTMLElement).blur()}
                className={'w-full justify-center !py-0'}
              />
            )}
            format={['DD/MM/YYYY', 'DD/MM/YY']}
            value={!!selectedKeys && selectedKeys.length && [dayjs(selectedKeys[0]), dayjs(selectedKeys[1])]}
            onChange={(e) => setSelectedKeys(e)}
          />
          {groupButton(confirm, clearFilters, key, selectedKeys, setSelectedKeys)}
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <i className="las la-lg la-calendar" style={{ color: filtered ? '#3699FF' : undefined }} />
      ),
    });
    cols.current = columns
      .filter((col: any) => !!col && !!col.tableItem)
      .map((col: any, index: number) => {
        let item = col.tableItem;

        if (item.filter) {
          if (params[filter] && params[filter][col.name]) {
            item = { ...item, defaultFilteredValue: params[filter][col.name] };
          }

          switch (item.filter.type) {
            case 'radio':
              item = {
                ...item,
                ...getColumnSearchRadio(item.filter.list, col.name),
              };
              break;
            case 'checkbox':
              item = {
                ...item,
                ...getColumnSearchCheckbox(item.filter.list, col.name),
              };
              break;
            case 'date':
              item = { ...item, ...getColumnSearchDate(col.name) };
              break;
            default:
              item = { ...item, ...getColumnSearchInput(col.name) };
          }
          delete item.filter;
        }

        if (item.sorter && params[sort] && params[sort][col.name]) {
          item.defaultSortOrder =
            params[sort][col.name] === 'ASC' ? 'ascend' : params[sort][col.name] === 'DESC' ? 'descend' : '';
        }
        if (!item.render) {
          item.render = (text: string) => text && checkTextToShort(text);
        }
        // noinspection JSUnusedGlobalSymbols
        return {
          title: col.title,
          dataIndex: col.name,
          onHeaderCell: (column: any) => ({
            minWidth: xScroll && item.width,
            width: xScroll && column.width,
            onResize: handleResize(index),
          }),
          ...item,
        };
      });

    const [_columns, set_columns] = useState(cols.current.map((item: any) => item.width));
    const xScrollRef = useRef(xScroll);
    if (_columns.length !== cols.current.length) {
      set_columns(cols.current.map((item: any) => item.width));
    }

    const handleResize =
      (index: number) =>
      (_: any, { size }: any) => {
        if (typeof xScroll === 'number') {
          _columns[index] = size.width;
          cols.current[index].width = size.width;
          const sumColumns = columns.reduce((partialSum: number, a: any) => partialSum + (a?.tableItem?.width || 0), 0);
          const sumCols = cols.current.reduce((partialSum: number, a: any) => partialSum + (a?.width || 0), 0);
          xScrollRef.current = xScroll + (sumCols - sumColumns);
          set_columns([..._columns]);
        }
      };
    const handleTableChange = (pagination: any, filters = {}, sorts: any, tempFullTextSearch: string) => {
      let tempPageIndex = pagination?.current || params[pageIndex];
      const tempPageSize = pagination?.pageSize || params[pageSize];

      const tempSort =
        sorts && sorts?.field && sorts?.order
          ? {
              [sorts.field]: sorts.order === 'ascend' ? 'ASC' : sorts.order === 'descend' ? 'DESC' : '',
            }
          : sorts?.field
          ? null
          : sorts;

      if (tempFullTextSearch !== params[fullTextSearch]) {
        tempPageIndex = 1;
      }
      const tempParams = cleanObjectKeyNull({
        ...params,
        [pageIndex]: tempPageIndex,
        [pageSize]: tempPageSize,
        [sort]: JSON.stringify(tempSort),
        [filter]: JSON.stringify(cleanObjectKeyNull(filters)),
        [fullTextSearch]: tempFullTextSearch,
      });
      onChange && onChange(tempParams);
    };

    return (
      <div className={classNames(className, 'intro-x')}>
        <div className="sm:flex justify-between mb-2.5">
          {showSearch ? (
            <div className="relative">
              <input
                id={idE.current + '_input_search'}
                className="w-full sm:w-52 h-10 rounded-xl text-gray-600 bg-white border border-solid border-gray-100 pr-9 pl-4"
                defaultValue={params[fullTextSearch]}
                type="text"
                placeholder={searchPlaceholder || t('components.datatable.pleaseEnterValueToSearch')}
                onChange={() => {
                  clearTimeout(timeoutSearch.current);
                  timeoutSearch.current = setTimeout(() => {
                    handleTableChange(
                      null,
                      params[filter],
                      params[sort],
                      (document.getElementById(idE.current + '_input_search') as HTMLInputElement).value,
                    );
                  }, 500);
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleTableChange(
                      null,
                      params[filter],
                      params[sort],
                      (document.getElementById(idE.current + '_input_search') as HTMLInputElement).value,
                    );
                  }
                }}
              />
              <i
                className={classNames('text-lg las absolute top-1.5 right-3 z-10', {
                  'la-search': !params[fullTextSearch],
                  'la-times': !!params[fullTextSearch],
                })}
                onClick={() => {
                  if (params[fullTextSearch]) {
                    (document.getElementById(idE.current + '_input_search') as HTMLInputElement).value = '';
                    handleTableChange(null, params[filter], params[sort], '');
                  }
                }}
              />
            </div>
          ) : (
            <div />
          )}
          {!!leftHeader && <div className={'mt-2 sm:mt-0'}>{leftHeader}</div>}
          {!!rightHeader && <div className={'mt-2 sm:mt-0'}>{rightHeader}</div>}
        </div>
        {subHeader && subHeader(objData?.count)}
        {!!showList && (
          <Fragment>
            <Table
              components={{
                header: {
                  cell: ResizableTitle,
                },
              }}
              onRow={onRow}
              locale={{
                emptyText: <div className="bg-gray-100 text-gray-400 py-4">{emptyText}</div>,
              }}
              loading={isLoading}
              columns={_columns.map((item: any, index: number) => {
                if (item) {
                  cols.current[index].width = item;
                }
                return cols.current[index];
              })}
              pagination={false}
              dataSource={objData?.data.map((item: any) => ({
                ...item,
                key: item.id || v4(),
              }))}
              onChange={(pagination, filters, sorts) => handleTableChange(null, filters, sorts, params[fullTextSearch])}
              showSorterTooltip={false}
              scroll={{ x: xScrollRef.current, y: yScroll }}
              size="small"
              {...prop}
            />
            {showPagination && (
              <Pagination
                total={objData?.count}
                pageIndex={+params[pageIndex]}
                pageSize={+params[pageSize]}
                pageSizeOptions={pageSizeOptions}
                pageSizeRender={pageSizeRender}
                pageSizeWidth={pageSizeWidth}
                queryParams={(pagination: any) =>
                  handleTableChange(pagination, params[filter], params[sort], params[fullTextSearch])
                }
                paginationDescription={paginationDescription}
                idElement={idE.current}
                {...prop}
              />
            )}
          </Fragment>
        )}
        {!!footer && <div className="footer">{footer(objData)}</div>}
      </div>
    );
  },
);
Hook.displayName = 'HookTable';
type Type = {
  columns: any[];
  isLoading?: boolean;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  Get?: (params: any, id: any) => Promise<any>;
  id?: () => boolean;
  showList?: boolean;
  footer?: (objData: any) => any;
  defaultRequest?: any;
  pageIndex?: string;
  pageSize?: string;
  sort?: string;
  filter?: string;
  fullTextSearch?: string;
  showPagination?: boolean;
  leftHeader?: JSX.Element;
  rightHeader?: JSX.Element;
  showSearch?: boolean;
  save?: boolean;
  searchPlaceholder?: any;
  subHeader?: (count: number) => any;
  xScroll?: string | number | true;
  yScroll?: string | number;
  emptyText?: JSX.Element;
  onRow?: (data: any) => { onDoubleClick: () => void };
  pageSizeOptions?: number[];
  pageSizeRender?: (sizePage: number) => number | string;
  pageSizeWidth?: string;
  paginationDescription?: (from: number, to: number, total: number) => string;
  idElement?: string;
  className?: string;
  data?: any[];
  count?: number;
};
export default Hook;
