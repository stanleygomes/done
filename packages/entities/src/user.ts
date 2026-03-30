export interface User {
  id?: string;
  name: string | null;
  email: string;
  avatarUrl?: string;
  createdAt?: number;
  updatedAt?: number;
}
