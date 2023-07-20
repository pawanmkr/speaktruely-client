import axios, { AxiosResponse } from "axios";
import { UserForm } from "../interface";

export const userRegistrationAndLogin = async (
  formData: UserForm
): Promise<string | number> => {
  if (formData.emailorusername && formData.password) {
    // Login
    const res = await axios.post(
      `${import.meta.env.VITE_API_V1_URL as string}/user/login`,
      {
        email_or_username: formData.emailorusername,
        password: formData.password,
      }
    );
    if (res && res.status === 404) {
      console.log("User does not exists");
      return res.status;
    }
  } else {
    // Register
    if (formData.fullname && formData.email && formData.password) {
      const res: AxiosResponse<string> = await axios.post(
        `${import.meta.env.VITE_API_V1_URL as string}/user/register`,
        {
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        }
      );
      if (res) {
        if (res.status === 409) {
          console.log("Email Already Exists");
          return res.status;
        }
        return res.data;
      }
    }
  }
  return 0;
};
