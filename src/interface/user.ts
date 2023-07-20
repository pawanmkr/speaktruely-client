export interface Decoded {
  userid: number;
  fullname: string;
  email: string;
  username: string;
  iat: number;
}

export interface UserForm {
  emailorusername: FormDataEntryValue | null;
  fullname: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  lostemail: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
