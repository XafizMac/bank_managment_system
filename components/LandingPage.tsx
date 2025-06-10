import { CheckCircle, FileCheck, FileText, Users } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserNav } from "./user-nav";
import { MainNav } from "./main-nav";

function LandingPage() {
  return (
    <div className="flex flex-col gap-6 items-center p-4">
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
        <div className="max-w-3xl space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <FileCheck className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Система электронного документооборота
          </h1>

          <p className="text-xl text-muted-foreground">
            Оптимизируйте свои рабочие процессы с банковскими документами с
            помощью нашей безопасной системы управления документами, эффективной
            и совместимой.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">Начать</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/help">Подробнее</Link>
            </Button>
          </div>

          <div className="grid gap-6 pt-8 md:grid-cols-3">
            <div className="rounded-lg p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium">
                Управление документооборотом
              </h3>
              <p className="text-sm text-muted-foreground">
                Создавайте, просматривайте и утверждайте документы с помощью
                упрощенного рабочий процесс.
              </p>
            </div>

            <div className="rounded-lg p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Управление клиентами</h3>
              <p className="text-sm text-muted-foreground">
                Управляйте информацией о клиентах и связанными с ними
                документами в одном месте.
              </p>
            </div>

            <div className="rounded-lg p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium">
                Готовность к соблюдению требований
              </h3>
              <p className="text-sm text-muted-foreground">
                Построенный с учетом банковских правил и требований к соблюдению
                нормативных требований .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
