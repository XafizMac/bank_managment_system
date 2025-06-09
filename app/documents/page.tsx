"use client";

import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  FileText,
  FilePlus,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { fetchUser } from "@/lib/fetchUser";

const DOCUMENTS = [
  {
    id: "DOC-12345",
    title: "Loan Agreement - Johnson Enterprises",
    type: "Loan Agreement",
    status: "pending",
    createdAt: "2025-04-10T09:30:00",
    updatedAt: "2025-04-12T11:15:00",
    assignedTo: "Alex Johnson",
    client: "Johnson Enterprises",
  },
  {
    id: "DOC-12346",
    title: "Credit Assessment - Smith Family Trust",
    type: "Credit Assessment",
    status: "approved",
    createdAt: "2025-04-08T10:15:00",
    updatedAt: "2025-04-11T14:22:00",
    assignedTo: "Sarah Williams",
    client: "Smith Family Trust",
  },
  {
    id: "DOC-12347",
    title: "Mortgage Contract - Emily Parker",
    type: "Mortgage Contract",
    status: "rejected",
    createdAt: "2025-04-05T11:20:00",
    updatedAt: "2025-04-10T16:30:00",
    assignedTo: "Michael Chen",
    client: "Emily Parker",
  },
  {
    id: "DOC-12348",
    title: "Client Onboarding - Tech Solutions Inc.",
    type: "Client Onboarding",
    status: "draft",
    createdAt: "2025-04-11T14:10:00",
    updatedAt: "2025-04-12T09:45:00",
    assignedTo: "Emma Davis",
    client: "Tech Solutions Inc.",
  },
  {
    id: "DOC-12349",
    title: "Annual Report - Global Finance Corp",
    type: "Annual Report",
    status: "approved",
    createdAt: "2025-04-02T09:45:00",
    updatedAt: "2025-04-09T13:20:00",
    assignedTo: "Robert Smith",
    client: "Global Finance Corp",
  },
  {
    id: "DOC-12350",
    title: "Internal Audit Report - Q1 2025",
    type: "Audit Report",
    status: "pending",
    createdAt: "2025-04-01T10:30:00",
    updatedAt: "2025-04-08T11:40:00",
    assignedTo: "Jennifer Lee",
    client: "Internal",
  },
  {
    id: "DOC-12351",
    title: "Employee Contract - John Wilson",
    type: "Employee Contract",
    status: "approved",
    createdAt: "2025-03-28T13:15:00",
    updatedAt: "2025-04-05T10:20:00",
    assignedTo: "David Miller",
    client: "HR Department",
  },
  {
    id: "DOC-12352",
    title: "Service Agreement - Cloud Systems Ltd",
    type: "Service Agreement",
    status: "draft",
    createdAt: "2025-04-09T15:30:00",
    updatedAt: "2025-04-12T10:10:00",
    assignedTo: "Lisa Garcia",
    client: "Cloud Systems Ltd",
  },
];

export default function DocumentsPage() {
  // const [DOCUMENTS, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredDocuments = DOCUMENTS.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedDocuments = [...filteredDocuments].sort((a: any, b: any) => {
    if (sortDirection === "asc") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  function getStatusColor(status: string) {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-800/20 dark:text-green-400";
      case "sent":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-800/20 dark:text-yellow-400";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-800/20 dark:text-red-400";
      case "draft":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80 dark:bg-gray-800/20 dark:text-gray-400";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-800/20 dark:text-blue-400";
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
        <Button asChild>
          <Link href="/documents/create">
            <FilePlus className="mr-2 h-4 w-4" />
            New Document
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="w-full sm:w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => handleSort("id")}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Document ID</span>
                        {sortColumn === "id" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("title")}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Title</span>
                        {sortColumn === "title" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("client")}
                      className="cursor-pointer hidden md:table-cell"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Client</span>
                        {sortColumn === "client" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("status")}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        {sortColumn === "status" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("updatedAt")}
                      className="cursor-pointer hidden md:table-cell"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Last Updated</span>
                        {sortColumn === "updatedAt" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.id}</TableCell>
                      <TableCell>
                        <Link
                          href={`/documents/${doc.id}`}
                          className="hover:underline text-primary"
                        >
                          {doc.title}
                        </Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {doc.client}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            getStatusColor(doc.status),
                            "capitalize"
                          )}
                        >
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(doc.updatedAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/documents/${doc.id}`}>View</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/documents/${doc.id}/edit`}>
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <p>
                Documents pending review or approval will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <p>Approved documents will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <p>Rejected documents will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <p>Draft documents will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
