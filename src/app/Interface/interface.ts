export interface employee {
  id: number,
  name: number,
  email: string,
  dateofbirth: number,
  number: number,
  bloodgroup: string,
  phone: number,
  designation: string,
  city: string,
  address: string | number,
  gender: string,
  password: string

}
export interface signUp {
  role: string,
  name: string;
  email: string;
  password: string;
}
export interface login {
  role: string,
  email: String;
  password: String;
}

