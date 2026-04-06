import { useAuth } from "../context/AuthContext";   // get the authentication data
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {    //protectedroute component(profile)
  const { user } = useAuth();    //Access global authentication state 

  return user ? children : <Navigate to="/login" />;
}