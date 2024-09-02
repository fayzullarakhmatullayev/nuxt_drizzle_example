export interface UserDto {
  name: string;
  email: string;
  age: number;
  role?: 'ADMIN' | 'BASIC';
}
