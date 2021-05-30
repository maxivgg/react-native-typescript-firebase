export interface FirebaseResponse {
  data(): { name: any; email: any; phone: any; };
  id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}
