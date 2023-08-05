import axios, { AxiosResponse } from "axios";
import { FollowSuggestion, UserProfile, UserForm } from "../interface";

const jwt: string | null = localStorage.getItem("jwt");

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

export const fetchFollowSuggestions = async (
  userId: number
): Promise<FollowSuggestion[] | undefined> => {
  if (!jwt) throw new Error("Jwt not found");
  try {
    const res: AxiosResponse<FollowSuggestion[]> = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/suggestions/follow`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          user_id: userId,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProfile = async (
  username: string
): Promise<UserProfile | undefined> => {
  try {
    const res: AxiosResponse<UserProfile> = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/profile`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          username: username,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkIfFollowingTheUser = async (
  id: number
): Promise<boolean | undefined> => {
  try {
    if (!jwt) throw new Error("Jwt not found");
    const res: AxiosResponse<{ following: boolean }> = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/user/follow/state`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          user_id: id,
        },
      }
    );
    return res.data.following;
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (followingId: number): Promise<void> => {
  try {
    if (!jwt) throw new Error("Jwt not found");
    await axios.post(
      `${import.meta.env.VITE_API_V1_URL as string}/user/follow`,
      { following_id: followingId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (followingId: number): Promise<void> => {
  if (!jwt) throw new Error("Jwt not found");
  try {
    await axios.post(
      `${import.meta.env.VITE_API_V1_URL as string}/user/unfollow`,
      { following_id: followingId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
