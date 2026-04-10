export interface User {
  id: string;
  name: string | null;
  email: string;
  password_hash?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
