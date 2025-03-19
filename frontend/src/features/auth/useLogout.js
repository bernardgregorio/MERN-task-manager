import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogOutMutation } from "./authApiSlice";
import { logOut } from "./authSlice";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogOutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout();
      dispatch(logOut());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return handleLogout;
};
