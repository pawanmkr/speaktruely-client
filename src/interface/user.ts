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

export interface FollowSuggestion {
  id: number;
  full_name: string;
  username: string;
}

export interface UserProfile {
  id: number;
  full_name: string;
  username: string;
  followers_count: number;
  following_count: number;
}
