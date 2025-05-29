import { AuthProvider } from "@/context/AuthProvider";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "@/components/auth/RequireAuth";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/components/dashboard/Dashboard";
import Login from "@/components/auth/Login";
import Missing from "@/components/Missing";
import Tasks from "@/components/tasks/Tasks";
import Todos from "@/components/todos/Todos";
import Users from "@/components/users/Users";
import Calendar from "@/components/calendar/Calendar";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}

          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/users" element={<Users />} />
              <Route path="/calendar" element={<Calendar />} />

              {/* 
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/settings" element={<Settings />}></Route> */}
            </Route>
          </Route>
          <Route path="*" element={<Missing />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
