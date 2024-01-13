export function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  return date.toLocaleDateString("id");
}
