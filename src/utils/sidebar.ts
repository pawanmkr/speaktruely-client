import { NavigateFunction } from "react-router-dom";
import { Decoded } from "../interface";

export const topics: string[] = ["Classroom", "Events", "Cricket", "Hip-Hop"];

/*
 * Menu option handling...
 */
export const handleSidebarOptions = (
  elementId: string,
  navigate: NavigateFunction,
  user: Decoded
): void => {
  switch (elementId) {
    case "logout":
      localStorage.removeItem("jwt");
      window.location.reload();
      break;
    case "profile":
      navigate(`/profile/${user.username}`);
      break;
    case "home":
      navigate(`/`);
      break;
    default:
      break;
  }
};
