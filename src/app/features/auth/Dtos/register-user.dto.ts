export interface RegisterUserDto{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  bio:string|null;
}