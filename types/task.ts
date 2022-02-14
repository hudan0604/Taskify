import { Priority } from "./priority";
import { Tag } from "./tag";

export interface Task {
  id?: number;
  taskName: string;
  body: string;
  priority: Priority;
  tag: Tag;
}
