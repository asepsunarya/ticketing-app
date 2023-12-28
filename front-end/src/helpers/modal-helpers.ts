export function openModal(modalId: string): void {
  if (document.getElementById(modalId)) {
    document.getElementById(modalId)?.click();
  }
}

export function closeModal(modalId: string): void {
  const modalToggle = document.getElementById(modalId);
  if (modalToggle) modalToggle.click();
}
