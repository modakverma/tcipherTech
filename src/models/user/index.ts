export interface IUser {
  app_version: string;
  countryCode: string;
  device_token: string;
  device_type: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  timezone: string;
  user_type: number;
}

export interface IUserResponse {
  app_version: string;
  country_code: string;
  device_token: string;
  device_type: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_type: number;
}

