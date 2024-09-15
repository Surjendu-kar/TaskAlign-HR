export interface ITask {
  id: string;
  taskName: string;
  description?: string;
  priority: number;
  dueDate: Date;
}
