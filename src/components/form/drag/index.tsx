import React, { useState, Fragment, useRef, SetStateAction, Dispatch } from 'react';
import { Popconfirm, Tooltip } from 'antd';
import { v4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
// import Nestable from './Nestable';

import { Button, ModalForm } from '@components';

const Component = ({
  condition,
  onDelete,
  items,
  onSave,
  onMoreAdd,
  renderLeftButton,
  showName,
  conditionDelete = () => true,
  conditionEdit = () => true,
  GetById,
  Post,
  Put,
  Delete,
  renderHeader,
  widthForm = 800,
  readOnly = false,
  showAddNew = true,
  showList = true,
  columns,
  allowActions = true,
  changeTitleConfirmDelete,
  extendButton,
  isAllowDrag = () => false,
  initAddNew = {},
  maxDepth = 1,
  conditionDrag = () => true,
  disabledDrag = false,
  ...propForm
}: Type) => {
  const { t } = useTranslation();
  const [titleConfirmDelete, set_titleConfirmDelete] = useState(t('components.datatable.areYouSureWant'));
  const [isLoading, setIsLoading] = useState(false);

  const findItemById = (newItem: any, id: string, array: any[]) => {
    return array.map((item) => {
      if (item.id === id) {
        return { ...item, ...newItem };
      } else if (item.children) {
        item.children = findItemById(newItem, id, item.children);
      }
      return item;
    });
  };

  const handleSubmit = async (values: any, id: string) => {
    if (id !== undefined) {
      onSave && onSave(findItemById(values, id, items));
    } else if (typeof values === 'object') {
      if (!values?.id) {
        values.id = v4() + '-11c';
      }
      items.push(values);
      onSave && onSave(items);
    } else {
      onSave && onSave(items);
    }
  };

  const handleDelete = async (id: string, item: any) => {
    if (Delete) {
      await Delete(id, item);
    }
    return onSave && onSave(deleteItem(items, id));
  };

  const deleteItem = (array: any, id: string) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        if (onDelete) {
          array[i] = onDelete(array[i]);
        } else {
          array[i] = null;
        }
      } else if (array[i].children) {
        array[i].children = deleteItem(array[i].children, id);
      }
    }
    return array.filter((item: any) => !!item);
  };

  let position = 0;
  const handChangePosition = ({ items, item }: any) => {
    position = 0;
    items = loop(items, 0, item);
    return onSave && onSave(items);
  };
  const loop = (array: any, parentId: any, item: any) => {
    for (let i = 0; i < array.length; i++) {
      position++;
      array[i].position = position;
      array[i].parent_id = parentId;
      if (array[i].children.length > 0) {
        array[i].children = loop(array[i].children, array[i].id, item);
      }
    }
    return array;
  };
  const modalForm = useRef<any>();

  const renderRow: any = (item: any, collapseIcon: any) =>
    (!condition || condition(item)) && (
      <div className="item-drag" key={item?.id || v4()}>
        <div className="flex flex-1 items-center py-2 pl-3">
          {!!collapseIcon && <div className="w-7">{collapseIcon}</div>}
          {showName ? showName(item, modalForm?.current?.handleEdit) : item?.name}
        </div>
        {!readOnly && (
          <div
            className={classNames('pr-1 flex items-center justify-end gap-2', {
              'w-20': !!conditionDelete(item),
              'w-10': !conditionDelete(item),
            })}
          >
            {extendButton && extendButton(item)}
            {((!!allowActions && !item?.allowActions) ||
              !!item?.allowActions?.allowEdit ||
              (typeof item.id === 'string' && item.id.length === 40)) &&
              conditionEdit(item) && (
                <Tooltip title={t('routes.admin.Layout.Edit')}>
                  <Button icon={'las la-edit'} onClick={() => modalForm?.current?.handleEdit(item)} />
                </Tooltip>
              )}
            {((!!allowActions && !item?.allowActions) ||
              !!item?.allowActions?.allowDelete ||
              (typeof item?.id === 'string' && item?.id.length === 40)) &&
              conditionDelete(item) && (
                <Tooltip title={t('routes.admin.Layout.Delete')}>
                  <Popconfirm
                    onOpenChange={(visible) =>
                      changeTitleConfirmDelete && changeTitleConfirmDelete(visible, item, set_titleConfirmDelete)
                    }
                    title={titleConfirmDelete}
                    icon={<i className="las la-question-circle text-2xl text-yellow-500 relative -top-1.5 left-1" />}
                    okText={t('components.datatable.ok')}
                    cancelText={t('components.datatable.cancel')}
                    onConfirm={() => handleDelete(item?.id, item)}
                  >
                    <Button icon={'las la-trash-alt'} className={'!bg-red-500'} />
                  </Popconfirm>
                </Tooltip>
              )}
          </div>
        )}
      </div>
    );
  return items ? (
    <Fragment>
      <div className="flex justify-between items-center mb-3">
        <div>{renderLeftButton && renderLeftButton(items)}</div>
        <div className="flex justify-end gap-2">
          {!readOnly && showAddNew && (
            <Button
              icon={'las la-plus'}
              text={t('routes.admin.Layout.Add')}
              onClick={() => modalForm?.current?.handleEdit(initAddNew)}
            />
          )}
          {onMoreAdd && onMoreAdd(items)}
        </div>
      </div>
      {!!showList && (
        <Fragment>
          {renderHeader && renderHeader(items)}
          {items.map((item: any) => !isAllowDrag(item) && renderRow(item))}
          {/*<Nestable*/}
          {/*  className={classNames({ disabled: readOnly || disabledDrag })}*/}
          {/*  maxDepth={maxDepth}*/}
          {/*  items={items}*/}
          {/*  collapsed={true}*/}
          {/*  confirmChange={(item: any) => conditionDrag(item)}*/}
          {/*  onChange={handChangePosition}*/}
          {/*  renderItem={({ item, collapseIcon }: any) => isAllowDrag(item) && renderRow(item, collapseIcon)}*/}
          {/*/>*/}
          {/*{items.map((item: any) => !!isAllowDrag(item) && renderRow(item))}*/}
        </Fragment>
      )}
      <ModalForm
        ref={modalForm}
        title={(data: any) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        handleChange={(values: any, oldData: any) => handleSubmit(values, oldData?.id)}
        columns={columns}
        GetById={GetById}
        Post={Post}
        Put={Put}
        widthModal={widthForm}
        {...propForm}
      />
    </Fragment>
  ) : (
    <div>No Data</div>
  );
};
type Type = {
  condition?: (item: any) => boolean;
  onDelete?: (item: any) => void;
  items: any;
  onSave: (items: any[]) => void;
  onMoreAdd?: (items: any[]) => JSX.Element;
  renderLeftButton?: (items: any[]) => JSX.Element;
  showName?: (item: any, handleEdit?: void) => JSX.Element;
  conditionDelete?: (item: any) => boolean;
  conditionEdit?: (item: any) => boolean;
  GetById: (id: string, item: any) => any;
  Post: (id?: string) => any;
  Put: (values: any, id: string) => Promise<any>;
  Delete: (id: string, item: any) => void;
  renderHeader?: (items: any[]) => JSX.Element;
  widthForm: number;
  readOnly?: boolean;
  showAddNew: boolean;
  showList?: boolean;
  columns: any[];
  allowActions?: boolean;
  changeTitleConfirmDelete?: (
    visible: boolean,
    item: any,
    set_titleConfirmDelete: Dispatch<SetStateAction<string | null>>,
  ) => void;
  extendButton?: (item: any) => JSX.Element;
  isAllowDrag?: (item: any) => boolean;
  initAddNew?: any;
  maxDepth?: number;
  conditionDrag?: (item: any) => boolean;
  disabledDrag?: boolean;
};
export default Component;
