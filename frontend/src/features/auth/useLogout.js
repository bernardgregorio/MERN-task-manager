import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogOutMutation } from "./authApiSlice";
import { logOut as ExecuteLogOut } from "./authSlice";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [processLogOut] = useLogOutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await processLogOut();
      dispatch(ExecuteLogOut());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return handleLogout;
};
