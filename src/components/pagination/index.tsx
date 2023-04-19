import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Select } from 'antd';
import classNames from 'classnames';
import { Arrow, DoubleArrow } from '@svgs';

export const Pagination: any = ({
  total = 4,
  pageSizeOptions = [],
  pageSize = 10,
  pageIndex = 1,
  queryParams = () => null,
  pageSizeRender = (sizePage: number) => sizePage + ' / page',
  pageSizeWidth = '115px',
  paginationDescription = (from: number, to: number, total: number) => from + '-' + to + ' of ' + total + ' items',
  idElement = 'pagination',
  className = 'pagination',
  firstPageDisabled = ({ pageIndex }: { pageIndex: number }) => pageIndex - 10 < 0,
  lastPageDisabled = ({ pageIndex, lastIndex }: { pageIndex: number; lastIndex: number }) => pageIndex + 10 > lastIndex,
  firstPage = ({ pageIndex }: { pageIndex: number }) => pageIndex - 10,
  lastPage = ({ pageIndex }: { pageIndex: number }) => pageIndex + 10,
  showSizeChanger = true,
  showTotal = true,
}: Type) => {
  const listOfPageItem = useRef<any>([]);
  const [ranges, setRanges] = useState<any>([]);
  const [lastNumber, set_lastNumber] = useState(0);
  const buildIndexes = useCallback(() => {
    const lastIndex = getLastIndex(total, pageSize);
    listOfPageItem.current = getListOfPageItem(pageIndex, lastIndex);
    setRanges([(pageIndex - 1) * pageSize + 1, Math.min(pageIndex * pageSize, total)]);
  }, [pageIndex, pageSize, total]);

  useEffect(() => {
    buildIndexes();
  }, [buildIndexes]);

  const getLastIndex = (total: any, pageSize: any) => {
    return Math.ceil(total / pageSize);
  };

  const onPageSizeChange = (size: any) => {
    queryParams({ pageSize: size, current: pageIndex });
    buildIndexes();
  };

  const onPageIndexChange = ({ type, index }: any) => {
    switch (type) {
      case 'prev':
        index = pageIndex - 1;
        break;
      case 'prev_10':
        index = firstPage({ pageIndex, lastIndex: lastNumber });
        break;
      case 'next':
        index = pageIndex + 1;
        break;
      case 'next_10':
        index = lastPage({ pageIndex, lastIndex: lastNumber });
        break;
      default:
    }
    queryParams({ pageSize, current: index });
  };

  const getListOfPageItem = (pageIndex: number, lastIndex: number) => {
    const concatWithPrevNext = (listOfPage: any) => {
      const prev10Item = {
        type: 'prev_10',
        disabled: firstPageDisabled({ pageIndex, lastIndex }),
      };
      const prevItem = {
        type: 'prev',
        disabled: pageIndex === 1,
      };
      const nextItem = {
        type: 'next',
        disabled: pageIndex === lastIndex,
      };
      const next10Item = {
        type: 'next_10',
        disabled: lastPageDisabled({ pageIndex, lastIndex }),
      };
      set_lastNumber(listOfPage.length);
      return [prev10Item, prevItem, ...listOfPage, nextItem, next10Item];
    };
    const generatePage = (start: number, end: number) => {
      const list = [];
      for (let i = start; i <= end; i++) {
        list.push({
          index: i,
          type: 'page_' + i,
        });
      }
      return list;
    };

    if (lastIndex <= 9) {
      return concatWithPrevNext(generatePage(1, lastIndex));
    } else {
      const generateRangeItem = (selected: number, last: number) => {
        let listOfRange;
        const prevFiveItem = {
          type: 'prev_5',
        };
        const nextFiveItem = {
          type: 'next_5',
        };
        const firstPageItem = generatePage(1, 1);
        const lastPageItem = generatePage(lastIndex, lastIndex);
        if (selected < 4) {
          listOfRange = [...generatePage(2, 4), nextFiveItem];
        } else if (selected < last - 3) {
          listOfRange = [prevFiveItem, ...generatePage(selected - 1, selected + 1), nextFiveItem];
        } else {
          listOfRange = [prevFiveItem, ...generatePage(last - 3, last - 1)];
        }
        return [...firstPageItem, ...listOfRange, ...lastPageItem];
      };
      return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
    }
  };

  return (
    total > 0 && (
      <div
        className={classNames(className, 'flex flex-col md:flex-row md:items-center justify-between mt-3 select-none')}
      >
        <div className={'left'}>
          <label htmlFor={idElement + '_page_size'}>
            {showSizeChanger && (
              <Select
                id={idElement + '_page_size'}
                defaultValue={pageSize}
                style={{ minWidth: pageSizeWidth }}
                onChange={(value) => onPageSizeChange(value)}
              >
                {pageSizeOptions.map((item: any, index: number) => (
                  <Select.Option key={index} value={item}>
                    {pageSizeRender(item)}
                  </Select.Option>
                ))}
              </Select>
            )}
          </label>
          {showTotal && <span className="ml-3 text-black">{paginationDescription(ranges[0], ranges[1], total)}</span>}
        </div>
        <div className="mt-3 sm:mt-0 right flex justify-center  p-1 rounded-xl bg-white">
          <div className="flex sm:flex-wrap justify-center duration-300 transition-all">
            {listOfPageItem.current.map((page: any, index: number) => (
              <button
                type={'button'}
                disabled={page.disabled}
                key={index}
                id={idElement + '_' + page.type}
                className={classNames(
                  'text-center p-1 mx-2 text-sm font-medium leading-normal relative',
                  {
                    'text-teal-900':
                      pageIndex !== page.index && !['next_5', 'prev_5'].includes(page.type),
                    'bg-teal-900 rounded-full text-white !px-2.5 ': pageIndex === page.index,
                    'text-blue-300': page.disabled,
                    'text-gray-600 text-xs': ['next_5', 'prev_5'].includes(page.type),
                  },
                )}
                onClick={() => onPageIndexChange(page)}
                aria-label={page.type}
              >
                {page.type === 'prev' && <Arrow className={'w-3 h-3 mx-1.5 rotate-180'} />}
                {page.type === 'next' && <Arrow className={'w-3 h-3 mx-1.5'} />}
                {page.type === 'prev_10' && <DoubleArrow className={'w-3 h-3 text-gray-400 rotate-180'} />}
                {page.type === 'next_10' && <DoubleArrow className={'w-3 h-3'} />}
                {page.type.indexOf('page') === 0 && page.index}
                {(page.type === 'prev_5' || page.type === 'next_5') && '...'}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

type Type = {
  total: number;
  pageSizeOptions: number[];
  pageSize: number;
  pageIndex: number;
  queryParams: ({ pageSize, current }: { pageSize: number; current: number }) => void;
  pageSizeRender: (sizePage: number) => string;
  pageSizeWidth: string;
  paginationDescription: (from: number, to: number, total: number) => string;
  idElement: string;
  className: string;
  firstPageDisabled: ({ pageIndex, lastIndex }: { pageIndex: number; lastIndex: number }) => boolean;
  lastPageDisabled: ({ pageIndex, lastIndex }: { pageIndex: number; lastIndex: number }) => boolean;
  firstPage: ({ pageIndex, lastIndex }: { pageIndex: number; lastIndex: number }) => number;
  lastPage: ({ pageIndex, lastIndex }: { pageIndex: number; lastIndex: number }) => number;
  showSizeChanger: boolean;
  showTotal: boolean;
};
export default Pagination;
