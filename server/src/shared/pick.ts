const pick = <P extends Record<string, unknown>, Q extends keyof P>(
  query: P,
  options: Q[]
): Partial<P> => {
  const finalObj: Partial<P> = {};

  for (const opt of options) {
    if (query && Object.hasOwnProperty.call(query, opt)) {
      finalObj[opt] = query[opt];
    }
  }
  return finalObj;
};

export default pick;
