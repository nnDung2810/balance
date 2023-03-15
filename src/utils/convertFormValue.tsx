import dayjs from 'dayjs';

const Util = (columns: any, values: any, exportData = true) => {
  columns
    .filter((item: any) => !!item && !!item.formItem)
    .map((item: any) => {
      if (item.formItem && item.formItem.convert) {
        if (typeof item.name === 'object' && item.name.length) {
          switch (item.name.length) {
            case 2:
              values[item.name[0]][item.name[1]] = item.formItem.convert(values[item.name[0]][item.name[1]]);
              break;
            case 3:
              values[item.name[0]][item.name[1]][item.name[2]] = item.formItem.convert(
                values[item.name[0]][item.name[1]][item.name[2]],
              );
              break;
            default:
              values[item.name[0]] = item.formItem.convert(values[item.name[0]]);
              break;
          }
        } else {
          values[item.name] = item.formItem.convert(values[item.name]);
        }
      } else {
        switch (item.formItem.type) {
          case 'switch':
            if (typeof values[item.name] === 'undefined' || typeof item.name === 'object') {
              if (typeof item.name === 'object' && item.name.length) {
                switch (item.name.length) {
                  case 2:
                    if (typeof values[item.name[0]][item.name[1]] === 'undefined') {
                      values[item.name[0]][item.name[1]] = false;
                    }
                    break;
                  case 3:
                    if (typeof values[item.name[0]][item.name[1]][item.name[2]] === 'undefined') {
                      values[item.name[0]][item.name[1]][item.name[2]] = false;
                    }
                    break;
                  default:
                    if (typeof values[item.name[0]] === 'undefined') {
                      values[item.name[0]] = false;
                    }
                    break;
                }
              } else {
                values[item.name] = false;
              }
            }
            break;
          case 'upload':
            if (values[item.name] && typeof values[item.name] === 'object' && exportData) {
              if (item.formItem.onlyImage && values[item.name].length > 0) {
                values[item.name] = values[item.name][0].url;
              } else if (values[item.name].length > 1) {
                values[item.name] = values[item.name].filter((_item: any) => _item.status === 'done' || !_item.status);
              }
            }
            break;
          case 'date':
            if (values[item.name] || typeof item.name === 'object') {
              if (typeof item.name === 'object' && item.name.length) {
                switch (item.name.length) {
                  case 2:
                    if (values[item.name[0]][item.name[1]]) {
                      if (exportData) {
                        values[item.name[0]][item.name[1]] =
                          values[item.name[0]][item.name[1]].format('YYYY-MM-DDTHH:mm:ss[Z]');
                      } else {
                        values[item.name[0]][item.name[1]] = dayjs(values[item.name[0]][item.name[1]]);
                      }
                    }
                    break;
                  case 3:
                    if (values[item.name[0]][item.name[1]]) {
                      if (exportData) {
                        values[item.name[0]][item.name[1]][item.name[2]] =
                          values[item.name[0]][item.name[1]][item.name[2]].format('YYYY-MM-DDTHH:mm:ss[Z]');
                      } else {
                        values[item.name[0]][item.name[1]][item.name[2]] = dayjs(
                          values[item.name[0]][item.name[1]][item.name[2]],
                        );
                      }
                    }
                    break;
                  default:
                    if (values[item.name[0]]) {
                      if (exportData) {
                        values[item.name[0]] = values[item.name[0]].format('YYYY-MM-DDTHH:mm:ss[Z]');
                      } else {
                        values[item.name[0]] = dayjs(values[item.name[0]]);
                      }
                    }
                    break;
                }
              } else {
                if (exportData) {
                  values[item.name] = values[item.name].format('YYYY-MM-DDTHH:mm:ss[Z]');
                } else {
                  values[item.name] = dayjs(values[item.name]);
                }
              }
            }
            break;
          case 'date_range':
            if (!!values[item.name] || typeof item.name === 'object') {
              if (typeof item.name === 'object' && item.name.length) {
                switch (item.name.length) {
                  case 2:
                    if (values[item.name[0]][item.name[1]]) {
                      if (exportData) {
                        values[item.name[0]][item.name[1]] = [
                          values[item.name[0]][item.name[1]][0].format('YYYY-MM-DDTHH:mm:ss[Z]'),
                          values[item.name[0]][item.name[1]][1].format('YYYY-MM-DDTHH:mm:ss[Z]'),
                        ];
                      } else {
                        values[item.name[0]][item.name[1]] = [
                          dayjs(values[item.name[0]][item.name[1]][0]),
                          dayjs(values[item.name[0]][item.name[1]][1]),
                        ];
                      }
                    }
                    break;
                  case 3:
                    if (values[item.name[0]][item.name[1]][item.name[2]]) {
                      if (exportData) {
                        values[item.name[0]][item.name[1]][item.name[2]] = [
                          values[item.name[0]][item.name[1]][item.name[2]][0].format('YYYY-MM-DDTHH:mm:ss[Z]'),
                          values[item.name[0]][item.name[1]][item.name[2]][1].format('YYYY-MM-DDTHH:mm:ss[Z]'),
                        ];
                      } else {
                        values[item.name[0]][item.name[1]][item.name[2]] = [
                          dayjs(values[item.name[0]][item.name[1]][item.name[2]][0]),
                          dayjs(values[item.name[0]][item.name[1]][item.name[2]][1]),
                        ];
                      }
                    }
                    break;
                  default:
                    if (values[item.name[0]]) {
                      if (exportData) {
                        values[item.name[0]] = [
                          values[item.name[0]][0].format('YYYY-MM-DDTHH:mm:ss[Z]'),
                          values[item.name[0]][1].format('YYYY-MM-DDTHH:mm:ss[Z]'),
                        ];
                      } else {
                        values[item.name[0]] = [dayjs(values[item.name[0]][0]), dayjs(values[item.name[0]][1])];
                      }
                    }
                    break;
                }
              } else {
                if (exportData) {
                  values[item.name] = [
                    values[item.name][0].format('YYYY-MM-DDTHH:mm:ss[Z]'),
                    values[item.name][1].format('YYYY-MM-DDTHH:mm:ss[Z]'),
                  ];
                } else {
                  values[item.name] = [dayjs(values[item.name][0]), dayjs(values[item.name][1])];
                }
              }
            }
            break;
          case 'number':
            if (!exportData && values && (values[item.name] || typeof item.name === 'object')) {
              if (typeof item.name === 'object' && item.name.length) {
                switch (item.name.length) {
                  case 2:
                    if (values[item.name[0]][item.name[1]]) {
                      values[item.name[0]][item.name[1]] = parseFloat(values[item.name[0]][item.name[1]]);
                    }
                    break;
                  case 3:
                    if (values[item.name[0]][item.name[1]][item.name[2]]) {
                      values[item.name[0]][item.name[1]][item.name[2]] = parseFloat(
                        values[item.name[0]][item.name[1]][item.name[3]],
                      );
                    }
                    break;
                  default:
                    if (values[item.name[0]]) {
                      values[item.name[0]] = parseFloat(values[item.name[0]]);
                    }
                    break;
                }
              } else {
                if (values[item.name]) {
                  values[item.name] = parseFloat(values[item.name]);
                }
              }
            }
            if (exportData) {
              values[item.name] = parseFloat(values[item.name]);
            }
            break;
          case 'tab':
            if (!exportData && !values[item.name]) {
              values[item.name] = item?.formItem?.list?.map((subItem: any) => {
                const result = {
                  [item?.formItem?.tab?.label]: subItem.value,
                };
                item?.formItem?.column.forEach((col: any) => {
                  if (col.formItem.type === 'layout') {
                    result[col.name] = [];
                  }
                });
                return result;
              });
            }
            break;
          case 'layout':
            if (!exportData && !values[item.name]) {
              values[item.name] = [];
            }
            break;
          default:
            if (!item?.formItem?.mask && typeof values[item.name] === 'string') {
              values[item.name] = values[item.name].trim();
            } else if (
              !!item?.formItem?.mask &&
              item?.formItem?.mask?.alias === 'numeric' &&
              item?.formItem?.mask?.groupSeparator &&
              item?.formItem?.mask?.radixPoint &&
              item?.formItem?.mask?.onBeforePaste
            ) {
              values[item.name] =
                values[item.name] &&
                values[item.name]
                  .trim()
                  .replaceAll(item.formItem.mask.groupSeparator, '')
                  .replaceAll(item.formItem.mask.radixPoint, '.');
            }
        }
      }
      return item;
    });
  return values;
};
export default Util;
