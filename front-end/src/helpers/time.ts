export function delay(milisecond: number) {
  return new Promise((resolve) => setTimeout(resolve, milisecond));
}
