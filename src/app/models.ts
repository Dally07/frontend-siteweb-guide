export interface Information {
    idInformation: number;
    titreInfo: string;
    corpsInfo: string;
    date: string;
    user: User;
  }
  
  export interface User {
    userId: number;
    username: string;
    salt: string;
    password: string;
    departement: Departement;
  }
  
  export interface Departement {
    idDepartement: number;
    nomDepartement: string;
  }
  
  export interface DepartmentData {
    department: string;
    count: number;
  }
  
  export interface DateData {
    date: string;
    count: number;
  }
  