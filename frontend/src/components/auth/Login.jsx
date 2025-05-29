import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthProvider";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleUserRound, Lock, CircleAlert } from "lucide-react";

import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

const Login = () => {
  const { auth, setPageTitle } = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (auth) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setError(false);
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...data, username }));
      setPageTitle("Dashboard");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);
      let msg = error?.data?.message[0].msg
        ? error?.data?.message[0].msg
        : error?.data?.message
        ? error?.data?.message
        : "Unable to login. Please try again.";
      setError(msg);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 font-roboto">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex justify-center"></div>
        <div className="flex justify-center">
          <img src="/images/bernardev.png" alt="" className="m-2 w-60" />
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl my-4">
                Task Management System
              </CardTitle>
              <CardTitle className="text-base">
                Log in to your account
              </CardTitle>
              <CardDescription>
                Enter your username and password below to log in
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-8 bg-red-100 text-red-800 border-red-400">
                  <CircleAlert className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-black">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="username">
                        <CircleUserRound size="18" />
                        Username
                      </Label>
                      <Input
                        id="username"
                        type="username"
                        required
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        autoComplete="off"
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">
                          <Lock size="18" />
                          Password
                        </Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full my-2"
                      {...(isLoading && { disabled: true })}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
