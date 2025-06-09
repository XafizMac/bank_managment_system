"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  FileCheck,
  FileText,
  Save,
  SendHorizontal,
  Upload,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function CreateDocumentPage() {
  const [title, setTitle] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", files[0]);
    formData.append("title", title);
    formData.append("documentType", documentType);
    formData.append("description", description);
    setIsSubmitting(true);

    try {
      const res = await axios.post("/api/documents/create", formData);
      console.log(res);
      toast({
        title: "Успешно!",
        description: res.data.message,
        type: "background",
      });
      router.push("/documents/my");
    } catch (e: any) {
      console.log("Error is:", e);
      toast({
        title: "Ошибка",
        description: e.data?.response?.message,
        type: "foreground"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Создать новый документ
        </h2>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Сведения о документе</CardTitle>
            <CardDescription>
              Введите сведения о новом документе, который нужно создать
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Название документа</Label>
                <Input
                  id="title"
                  placeholder="Введите название"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Тип документа</Label>
                <Select
                  value={documentType}
                  onValueChange={setDocumentType}
                  required
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Выбрать тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loan-agreement">
                      Кредитный договор
                    </SelectItem>
                    <SelectItem value="credit-assessment">
                      Оценка кредитоспособности
                    </SelectItem>
                    <SelectItem value="mortgage-contract">
                      Ипотечный договор
                    </SelectItem>
                    <SelectItem value="client-onboarding">
                      Адаптация клиента
                    </SelectItem>
                    <SelectItem value="annual-report">Годовой отчет</SelectItem>
                    <SelectItem value="audit-report">
                      Аудиторский отчет
                    </SelectItem>
                    <SelectItem value="employee-contract">
                      Трудовой договор с работником
                    </SelectItem>
                    <SelectItem value="service-agreement">
                      Соглашение об обслуживании
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Введите описание документа"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="files">Вложения</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              {files.length > 0 && (
                <div className="mt-2 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border px-3 py-2"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handleSubmit}
              type="button"
              disabled={isSubmitting || isSaving}
            >
              {isSubmitting ? (
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
                  Отправка...
                </span>
              ) : (
                <span className="flex items-center">
                  <SendHorizontal className="mr-2 h-4 w-4" />
                  Отправить документ
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
