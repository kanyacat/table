interface IArrWithName {
  name: string;
}

export function hasDuplicates<T extends IArrWithName>(array: T[]) {
  return new Set(array.map((arr: T) => arr.name)).size !== array.length;
}
