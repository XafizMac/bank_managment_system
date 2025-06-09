"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { fetchAllUsers } from "@/lib/fetchAllUsers";
import { fetchUser } from "@/lib/fetchUser";
import axios from "axios";
import { Ellipsis, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type Users = {
  id: string;
  name: string;
  login: string;
  password: string;
  role: Role;
  documents: string;
};

type Role = "admin" | "employee" | "archivist" | "approver";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("employee");
  const [errMessage, setErrMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchUser();
  }, []);

  const loadUsers = async () => {
    const data = await fetchAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  //! creating a user
  const createUser = async () => {
    if (!name || !login || !password) {
      setErrMessage("Заполните все поля");
      return false;
    }
    setLoading(true);
    axios
      .post("api/users/create", {
        name,
        login,
        password,
        role,
      })
      .then((res) => {
        console.log(res.data.message);
        if (res.status === 201) {
          setErrMessage("");
          toast({
            title: "Пользователь создан",
            description: res.data.message,
          });
        }
        loadUsers();
      })
      .catch((err) => {
        toast({
          title: "Ошибка",
          description: err.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
        setRole("employee");
        setModalOpen(false);
      });
  };

  //! Deleting a user
  const deleteUser = async (id: string) => {
    axios
      .delete("/api/users/delete", {
        data: {
          id,
        },
      })
      .then((res) => {
        toast({
          title: "Пользователь успешно удален",
          description: "Пользователь успешно удален",
        });
        loadUsers();
      })
      .catch((err) => {
        toast({
          title: "Ошибка",
          description: err.response.data.message,
        });
      });
  };

  return (
    <div className="container m-auto py-4 flex flex-col items-center">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Пользователи</h1>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button
              size={"sm"}
              variant={"secondary"}
              className="flex items-center gap-2"
              onClick={() => setModalOpen(true)}
            >
              <Plus size={22} />
              Добавить пользователя
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить пользователя</DialogTitle>
              <DialogDescription>
                Заполняйте ниже поля чтобы создать пользователя
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input
                autoComplete="off"
                required
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Имя"
              />
              <Input
                autoComplete="off"
                required
                defaultValue={login}
                onChange={(e) => setLogin(e.target.value)}
                type="text"
                placeholder="Логин"
              />
              <Input
                autoComplete="off"
                required
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Пароль"
              />
              <p className="text-red-600 text-sm">{errMessage}</p>
              <div className="flex gap-2">
                <Select onValueChange={(value) => setRole(value as Role)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выбрать роль" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Роль</SelectLabel>
                      <SelectItem value="admin">Админ</SelectItem>
                      <SelectItem value="employee">Сотрудник</SelectItem>
                      <SelectItem value="archivist">Архивариус</SelectItem>
                      <SelectItem value="approver">Согласающий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button onClick={createUser}>
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
                      <Plus className="mr-2 h-4 w-4" />
                      Добавить
                    </span>
                  )}
                </Button>
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button className="text-left" variant={"ghost"}>
                  Отмена
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {users.length ? (
        <Table className="mt-4">
          <TableCaption>Список всех пользователей ЭДО банка.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Имя</TableHead>
              <TableHead>Логин</TableHead>
              <TableHead>Пароль</TableHead>
              <TableHead>Документы</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: Users, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.documents.length}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      user.role === "admin"
                        ? "bg-blue-500"
                        : user.role === "employee"
                        ? "bg-green-500"
                        : user.role === "approver"
                        ? "bg-red-500"
                        : "bg-black"
                    }`}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="rounded-full"
                      >
                        <Ellipsis className="text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Изменить роль</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteUser(user.id)}>
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>Количество пользователей</TableCell>
              <TableCell className="text-right">{users.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="mt-4 flex flex-col gap-4 w-full items-center">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full"></Skeleton>
        </div>
      )}
    </div>
  );
}
