import AuthenticationForm from "../components/authentication/AuthenticationForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const jwt: string | null = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      navigate("/home");
      return;
    }
  }, [navigate, jwt]);

  return (
    <>
      <AuthenticationForm />
    </>
  );
};

export default LandingPage;
