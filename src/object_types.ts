export type Priority = 0 | 1 | 2;
const priorities = ["Low", "Medium", "High"];
export const priority_raw_to_string = (raw: Priority) => priorities[raw];
export const priority_string_to_raw = (str: string) => priorities.indexOf(str);

export type Status = 0 | 1 | 2;
const statuses = ["Not started", "Started", "Completed"];
export const status_raw_to_string = (raw: Status) => statuses[raw];
export const status_string_to_raw = (str: string) => statuses.indexOf(str);

export interface Task {
  id: number;
  description: string;
  note?: string;
  priority: Priority;
  status: Status;
  subtasks?: Task[];
}
