import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Statement, Update, UserRole } from "@/types";
import { mockUser } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Shield, Crown, User as UserIcon } from "lucide-react";

const roleBadgeColor: Record<UserRole, string> = {
  official: "bg-brand-saffron/20 border-brand-saffron text-brand-saffron",
  admin: "bg-brand-navy-blue/20 border-brand-navy-blue text-brand-navy-blue",
  auditor: "bg-orange-500/20 border-orange-500 text-orange-600",
  citizen: "bg-brand-green/20 border-brand-green text-brand-green",
};

const roleIcon: Record<UserRole, React.ReactNode> = {
  official: <Shield className="h-3 w-3" />,
  admin: <Crown className="h-3 w-3" />,
  auditor: <UserIcon className="h-3 w-3" />,
  citizen: <UserIcon className="h-3 w-3" />,
};

export function RecentActivity({ statements }: { statements: Statement[] }) {
  const recentUpdates = statements
    .flatMap(s => s.updates.map(u => ({ ...u, statementTitle: s.title })))
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from officials and citizens.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentUpdates.map((update) => (
            <div key={update.id} className="flex gap-4">
              <Avatar className="h-9 w-9">
                {/* In a real app, this would be the author's avatar */}
                <AvatarImage src={mockUser.avatarUrl} alt="Avatar" data-ai-hint="person avatar" />
                <AvatarFallback>{update.author.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-bold">{update.author}</span> made an update on <span className="font-bold text-primary">{update.statementTitle}</span>
                </p>
                <p className="text-sm text-muted-foreground italic">"{update.content}"</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className={cn("flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border", roleBadgeColor[update.authorRole])}>
                        {roleIcon[update.authorRole]}
                        {update.authorRole}
                    </span>
                    <time className="text-xs text-muted-foreground">
                        {new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(update.timestamp)}
                    </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
