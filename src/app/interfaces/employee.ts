export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  dateJoined: string;
}

export type EmployeeInput = Omit<Employee, 'id'>

export type EmployeeUpdateInput = Partial<EmployeeInput>;