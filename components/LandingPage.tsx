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
            Electronic Document Management System
          </h1>

          <p className="text-xl text-muted-foreground">
            Streamline your banking document workflows with our secure,
            efficient, and compliant document management system.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/help">Learn More</Link>
            </Button>
          </div>

          <div className="grid gap-6 pt-8 md:grid-cols-3">
            <div className="rounded-lg p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Document Management</h3>
              <p className="text-sm text-muted-foreground">
                Create, review, and approve documents with a streamlined
                workflow.
              </p>
            </div>

            <div className="rounded-lg p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Client Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage client information and associated documents in one place.
              </p>
            </div>

            <div className="rounded-lg p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Compliance Ready</h3>
              <p className="text-sm text-muted-foreground">
                Built with banking regulations and compliance requirements in
                mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
