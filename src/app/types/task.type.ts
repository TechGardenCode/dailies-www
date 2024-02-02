export type Task = {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDateTime?: Date;
}

export type TaskStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETE';
