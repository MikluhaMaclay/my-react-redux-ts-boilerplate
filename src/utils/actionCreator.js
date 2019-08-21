export function typeCreator (typeArr, ns, isAsync) {
  const types = {};
  typeArr.forEach((type) => {
    types[type] = `${ns}_${type}`;
    if (!isAsync) return;
    types[`${type}_SUCCESS`] = `${ns}_${type}_SUCCESS`;
    types[`${type}_FAIL`] = `${ns}_${type}_FAIL`;
  });
  return types;
}

export function createTypes(actions, prefix) {
  const types = {};
  actions.forEach((action) => {
    types[action];
  });
}
