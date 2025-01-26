export interface User {
  _id?: string;
  email: string;
  isActive: boolean;
  name: string;
  password?: string;
  roles: string[];
}
