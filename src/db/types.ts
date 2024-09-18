export type Priority = 0 | 1 | 2;
const priorities = ["Low", "Medium", "High"];
export const priorityToString = (raw: Priority) => priorities[raw];
export const priorityToRaw = (str: string) => priorities.indexOf(str);

export type Status = 0 | 1 | 2;
const statuses = ["Completed", "In progress", "Not started"];
export const statusToString = (raw: Status) => statuses[raw];
export const statusToRaw = (str: string) => statuses.indexOf(str);

export interface Task {
  id: number;
  description: string;
  note?: string;
  priority: Priority;
  status: Status;
  parentPath?: string;
}
