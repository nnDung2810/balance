const Util = (values: any, parentId: string | null = null) => {
  return values.map((item: any, index: number) => {
    const data: any = { id: item.id, order: index, parentId };
    if (item?.children?.length) {
      data.parents = [];
      item.children.forEach((item: any) => data.parents.push(item.id));
      data.children = Util(item.children, item.id);
    }
    return data;
  });
};
export default Util;
