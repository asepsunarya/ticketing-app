export function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  return date.toLocaleDateString("id");
}

export function formatDateString(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Date(dateString).toLocaleDateString("ID", options);
  return formattedDate;
}
