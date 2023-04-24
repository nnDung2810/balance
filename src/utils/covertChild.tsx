const Util = (values: children[], parentId?: string) => {
  return values.map((item, index: number) => {
    const data: children = { id: item.id, order: index, parentId };
    if (item?.children?.length) {
      data.parents = [];
      item.children.forEach((item) => data.parents!.push(item.id));
      data.children = Util(item.children, item.id);
    }
    return data;
  });
};
export default Util;
interface children {
  id: string;
  parentId?: string;
  order: number;
  parents?: string[];
  children?: children[];
}
