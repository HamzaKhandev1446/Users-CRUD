export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  designation: string;
  managerId: number | null;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  jobType: string;
  jobMode: string;
}