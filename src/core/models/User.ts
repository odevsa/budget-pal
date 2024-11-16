export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  image?: string;
  createdAt: Date;
}
