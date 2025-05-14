import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./features/dashboard/Dashboard";
import Missing from "./components/Missing";
import Tasks from "./features/tasks/Tasks";
import Todos from "./features/todos/Todos";
import Users from "./features/users/Users";
import Profile from "./features/users/Profile";
import Settings from "./features/settings/Settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/team-members" element={<Users />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;
