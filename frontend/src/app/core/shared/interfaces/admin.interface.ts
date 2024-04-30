export interface Admin {
  _id: string;
  active: boolean;
  passwordChangedAt: string | Date;
  persmissions: Array<string>;
  roles: string;
  username: string;
}
