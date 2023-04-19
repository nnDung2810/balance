export default (obj: any) => {
  for (const propName in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, propName)) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        (typeof obj[propName] === 'object' && Object.keys(obj[propName]).length === 0)
      ) {
        delete obj[propName];
      } else if (typeof obj[propName] === 'object') {
        const keys = Object.keys(obj[propName]);
        let check = true;
        keys.forEach((key: string) => {
          if (check && obj[propName][key] !== undefined) {
            check = false;
          }
        });
        if (check) {
          delete obj[propName];
        }
      }
    }
  }
  return obj;
};
