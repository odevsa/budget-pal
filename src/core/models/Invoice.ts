export interface Invoice {
  id?: number;
  userId: number;
  title: string;
  value?: number;
  isInput: boolean;
  isActive: boolean;
  dueDay: number;
  createdAt?: Date;
}
