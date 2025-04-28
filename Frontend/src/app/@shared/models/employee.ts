export interface Employee {
  id: string;
  name: string;
  imgUrl: string;
  email: string;
  phone: string;
  role: string;
  specialization: string;
  bio: string;
  services: EmployeeService[];
  schedule: EmployeeSchedule[];
  reviews: Review[];
  portfolio: EmployeePortfolioItem[];
}

export interface EmployeeService {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export interface EmployeeSchedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface EmployeePortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
}
