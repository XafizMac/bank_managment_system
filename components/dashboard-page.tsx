"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  FilePlus,
  Clock,
  AlertCircle,
  CheckCircle,
  Users,
  Building2,
  FileCheck,
  ArrowRight,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { RecentActivity } from "@/components/recent-activity";
import Link from "next/link";
import { useStore } from "@/store/store";
import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";

// Mock authentication - in real app would use a proper auth system

const documentStats = [
  { name: "Pending", value: 8, color: "#F59E0B" },
  { name: "Approved", value: 22, color: "#10B981" },
  { name: "Rejected", value: 2, color: "#EF4444" },
  { name: "Draft", value: 12, color: "#6B7280" },
];

const monthlyDocuments = [
  { name: "Янв", documents: 45 },
  { name: "Фев", documents: 52 },
  { name: "Март", documents: 49 },
  { name: "Апр", documents: 62 },
  { name: "Май", documents: 55 },
  { name: "Июнь", documents: 68 },
];

export function DashboardPage() {

  return (
    <div className="flex-1">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Панель</h2>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/documents/create">
                <FilePlus className="mr-2 h-4 w-4" />
                Новый документ
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="pending">Отложенные задачи</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Общее количество документов
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,284</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% с прошлого месяца
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ожидающий рассмотрения
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    3 требуют срочного внимания
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Активные клиенты
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">
                    +4 новое на этой неделе
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Активные филиалы
                  </CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Все филиалы работают
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Ежемесячная работа с документами</CardTitle>
                  <CardDescription>
                    Количество обрабатываемых документов в месяц
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyDocuments}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="documents" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Статус документа</CardTitle>
                  <CardDescription>
                    Текущий статус всех документов
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[300px] w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={documentStats}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {documentStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [
                            `${value} документы`,
                            name,
                          ]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Недавняя активность</CardTitle>
                <CardDescription>Последние действия в системе</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4 grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>Документы, Ожидающие Вашего Решения</CardTitle>
                  <CardDescription>
                    Эти документы требуют вашего рассмотрения или одобрения
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <PendingDocumentCard
                        title="Loan Agreement #12345"
                        client="Johnson Enterprises"
                        timeRemaining="1 day"
                        status="urgent"
                      />
                      <PendingDocumentCard
                        title="Credit Assessment #89012"
                        client="Smith Family Trust"
                        timeRemaining="2 days"
                        status="normal"
                      />
                      <PendingDocumentCard
                        title="Mortgage Contract #56789"
                        client="Emily Parker"
                        timeRemaining="5 hours"
                        status="urgent"
                      />
                      <PendingDocumentCard
                        title="Client Onboarding #45678"
                        client="Tech Solutions Inc."
                        timeRemaining="3 days"
                        status="normal"
                      />
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline" asChild>
                        <Link href="/documents/inbox">
                          View All Pending Items
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Processing Time Analysis</CardTitle>
                  <CardDescription>
                    Average document processing time by department
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { department: "Legal", time: 3.2 },
                          { department: "Credit", time: 2.1 },
                          { department: "Compliance", time: 4.5 },
                          { department: "Management", time: 1.8 },
                          { department: "Operations", time: 2.9 },
                        ]}
                        margin={{ left: 80 }}
                      >
                        <XAxis type="number" unit=" days" />
                        <YAxis
                          dataKey="department"
                          type="category"
                          width={80}
                        />
                        <Tooltip
                          formatter={(value) => [`${value} days`, "Avg. Time"]}
                        />
                        <Bar dataKey="time" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Approval Rate by Branch</CardTitle>
                  <CardDescription>
                    Document approval percentage by branch
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { branch: "Main", rate: 92 },
                          { branch: "North", rate: 88 },
                          { branch: "East", rate: 95 },
                          { branch: "South", rate: 91 },
                          { branch: "West", rate: 87 },
                        ]}
                      >
                        <XAxis dataKey="branch" />
                        <YAxis domain={[80, 100]} unit="%" />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Approval Rate"]}
                        />
                        <Bar dataKey="rate" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function PendingDocumentCard({
  title,
  client,
  timeRemaining,
  status,
}: {
  title: string;
  client: string;
  timeRemaining: string;
  status: "urgent" | "normal";
}) {
  return (
    <div className="flex items-start space-x-4 rounded-lg border p-4">
      <div
        className={`mt-0.5 rounded-full p-1 ${
          status === "urgent"
            ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
            : "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
        }`}
      >
        {status === "urgent" ? (
          <AlertCircle className="h-4 w-4" />
        ) : (
          <Clock className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <p className="font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">Клиент: {client}</p>
        <div className="flex items-center pt-2">
          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Due in {timeRemaining}
          </span>
        </div>
      </div>
      <Button variant="secondary" size="sm">
        Обзор
      </Button>
    </div>
  );
}