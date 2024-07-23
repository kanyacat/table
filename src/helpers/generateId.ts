function createUniqueId() {
  let uniqueId = 2;
  return () => uniqueId++;
}

export const generatorUniqueId = createUniqueId();
