import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CheckCircle2, 
  Clock, 
  Edit, 
  FileText, 
  Send, 
  XCircle 
} from "lucide-react";

const activities = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      email: "alex.j@bank.com",
      avatar: "/avatar-1.png",
      initials: "AJ",
    },
    action: "approved",
    document: "Loan Agreement #12345",
    timestamp: "5 minutes ago",
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      email: "s.williams@bank.com",
      avatar: "/avatar-2.png",
      initials: "SW",
    },
    action: "created",
    document: "Credit Assessment #89012",
    timestamp: "25 minutes ago",
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      email: "m.chen@bank.com",
      avatar: "/avatar-3.png",
      initials: "MC",
    },
    action: "rejected",
    document: "Mortgage Contract #56789",
    timestamp: "1 hour ago",
  },
  {
    id: 4,
    user: {
      name: "Emma Davis",
      email: "e.davis@bank.com",
      avatar: "/avatar-4.png",
      initials: "ED",
    },
    action: "reviewed",
    document: "Client Onboarding #45678",
    timestamp: "2 hours ago",
  },
  {
    id: 5,
    user: {
      name: "Robert Smith",
      email: "r.smith@bank.com",
      avatar: "/avatar-5.png",
      initials: "RS",
    },
    action: "sent",
    document: "Annual Report #34567",
    timestamp: "3 hours ago",
  }
];

export function RecentActivity() {
  function getActionIcon(action: string) {
    switch (action) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "created":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "reviewed":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "sent":
        return <Send className="h-4 w-4 text-indigo-500" />;
      default:
        return <Edit className="h-4 w-4 text-gray-500" />;
    }
  }

  function getActionVerb(action: string) {
    switch (action) {
      case "approved":
        return "approved";
      case "rejected":
        return "rejected";
      case "created":
        return "created";
      case "reviewed":
        return "reviewed";
      case "sent":
        return "sent";
      default:
        return "modified";
    }
  }

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">
                {activity.user.name}
              </p>
              <div className="flex items-center">
                {getActionIcon(activity.action)}
                <span className="text-xs text-muted-foreground ml-1">
                  {getActionVerb(activity.action)}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.document}
            </p>
            <p className="text-xs text-muted-foreground">
              {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}