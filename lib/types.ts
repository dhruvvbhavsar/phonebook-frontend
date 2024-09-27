export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  city: string;
  country: string;
  spamRatio: number;
  isSpam: boolean;
}