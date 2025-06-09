"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchUser } from "@/lib/fetchUser";
import { useStore } from "@/store/store";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function MyDocuments() {
  const [docx, setDocx] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);

  const user = useStore((state) => state.user);

  const setDate = (dateString: string) => {
    const date = new Date(dateString);
    const shortDate = date.toLocaleDateString("ru-RU");
    return shortDate;
  };

  return (
    <div className="m-auto w-[95%] py-4 flex flex-col space-y-4 items-center">
      <h2 className="text-2xl font-semibold self-start">Мои документы</h2>
      <Tabs className="flex flex-col w-full space-y-3 items-center">
        <TabsList defaultValue="draft">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="draft">Черновики</TabsTrigger>
          <TabsTrigger value="sent">Отправленные</TabsTrigger>
          <TabsTrigger value="review">На рассмотрении</TabsTrigger>
          <TabsTrigger value="approved">Солгасован</TabsTrigger>
          <TabsTrigger value="rejected">Отклонен</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="all">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>№</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Дата создание</TableHead>
                <TableHead>Автор</TableHead>
                <TableHead className="text-center">Файл</TableHead>
                <TableHead className="text-right">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.documents.map((docx, index) => {
                setDate(docx.createdAt);
                return (
                  <TableRow>
                    <TableCell>{index}</TableCell>
                    <TableCell>{docx.title}</TableCell>
                    <TableCell>{setDate(docx.createdAt)}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="text-center">
                      <Link target="_blank" href={docx.fileUrl}>
                        <Button variant={"link"}>
                          Открыть <ExternalLink size={18} color="rgb(25, 25, 25)"/>
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={"outline"} color="">
                        {docx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="draft">hi</TabsContent>
        <TabsContent value="sent"></TabsContent>
        <TabsContent value="review"></TabsContent>
        <TabsContent value="approved"></TabsContent>
        <TabsContent value="rejected"></TabsContent>
      </Tabs>
    </div>
  );
}
