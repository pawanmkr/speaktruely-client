import { NavigateFunction } from "react-router-dom";

/*
 * Menu option handling...
 */
export const handleSidebarOptions = (
  elementId: string,
  navigate: NavigateFunction
): void => {
  switch (elementId) {
    case "logout":
      localStorage.removeItem("jwt");
      window.location.reload();
      break;
    case "profile":
      navigate("/profile");
      break;
    default:
      break;
  }
};
