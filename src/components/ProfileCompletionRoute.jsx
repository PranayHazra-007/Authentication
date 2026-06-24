import { Navigate } from "react-router-dom";
import { calculateProgress } from "./ProgressBar";

const ProfileCompletionRoute = ({ children }) => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const progress = calculateProgress(
    currentUser.profile || {}
  );

  if (progress <= 50) {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default ProfileCompletionRoute;