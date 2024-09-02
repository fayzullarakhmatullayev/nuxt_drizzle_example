export interface UserModel {
  id: string;
  name: string;
  email: string;
  age: number;
  role: 'ADMIN' | 'BASIC';
}
