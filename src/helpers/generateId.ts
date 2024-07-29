function createUniqueId() {
  let uniqueId = 4;
  return () => uniqueId++;
}

export const generatorUniqueId = createUniqueId();
