"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileCheck, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useStore } from "@/store/store";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errMessage, setErrMessage] = useState("");
  const setAuthenticated = useStore((state) => state.setAuthenticated);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "/api/login",
        { login, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setAuthenticated(true);
        router.push("/");
        setErrMessage("");
      })
      .catch((err) => {
        console.log(err);
        setErrMessage(err.response.data.statusText);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="inline-block rounded-full bg-primary/10 p-3">
            <FileCheck className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Добро пожаловать в BankDocs</h1>
          <p className="text-muted-foreground">
            Войдите в систему, чтобы получить доступ к вашей системе управления
            документами
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Вход</CardTitle>
            <CardDescription>
              Введите свои учетные данные для доступа к вашей учетной записи
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Логин</Label>
                <Input
                  id="login"
                  type="text"
                  placeholder="Логин"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
                <p className="text-red-600 text-[12px] font-sans">{errMessage}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <Input
                  autoComplete="off"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Вполняется...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Войти
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Don't have access? Contact your system administrator</p>
        </div>
      </div>
    </div>
  );
}
