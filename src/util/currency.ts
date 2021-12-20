export function getDecimals(price: number): number {
  return parseInt((price % 1).toFixed(2).substring(2))
}
