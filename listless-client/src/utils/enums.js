export const jobStatuses = Object.freeze({
  NOT_DONE: 1,
  IN_PROGRESS: 2,
  DONE: 3
});

export const patientPriorities = Object.freeze({
  HIGH: 1,
  STANDARD: 2,
  FIT_FOR_DISCHARGE: 3
});

export function patientPriorityText(priority) {
  switch (priority) {
    case patientPriorities.HIGH:
      return 'High';
    case patientPriorities.FIT_FOR_DISCHARGE:
      return 'Medically fit for discharge';
    default:
      return null;
  }
}