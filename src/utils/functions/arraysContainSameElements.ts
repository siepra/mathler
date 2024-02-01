export function arraysContainSameElements(a: string[], b: string[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  const countMap = new Map();

  for (const item of a) {
    countMap.set(item, (countMap.get(item) || 0) + 1);
  }

  for (const item of b) {
    if (!countMap.has(item)) {
      return false;
    }
    countMap.set(item, countMap.get(item) - 1);
  }

  return Array.from(countMap.values()).every(count => count === 0);
}
