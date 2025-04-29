export interface Service {
  id: string;
  name: string;
  description: string;
  category?: string;
  employeeServices: EmployeeServicePrice[];
}

export interface EmployeeServicePrice {
  employeeId: string;
  employeeName: string;
  duration: number;
  price: number;
}
