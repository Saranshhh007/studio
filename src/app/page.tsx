import { dashboardData, mockUser } from '@/lib/data';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { PriorityQueue } from '@/components/dashboard/priority-queue';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { DashboardCharts } from '@/components/dashboard/charts';

export default function DashboardPage() {
  const user = mockUser;

  // Get current time in Hindi
  const now = new Date();
  const dateInHindi = new Intl.DateTimeFormat('hi-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(now);
  const dateInEnglish = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
  }).format(now);

  return (
    <div className="flex-1 space-y-8">
      <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-deep-blue">
            नमस्ते, {user.name}
          </h1>
          <p className="text-muted-foreground">
            Welcome to your main dashboard.
          </p>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium text-brand-deep-blue">{dateInEnglish}</p>
            <p className="text-sm text-muted-foreground">{dateInHindi}</p>
        </div>
      </div>
      <StatsCards stats={dashboardData.dashboardStats} />
      <div className="grid gap-8 lg:grid-cols-5">
        <PriorityQueue statements={dashboardData.priorityStatements} />
        <RecentActivity activities={dashboardData.recentActivity} />
      </div>
       <div className="grid gap-8 lg:grid-cols-5">
        <DashboardCharts chartData={dashboardData.chartData} statements={[]}/>
      </div>
    </div>
  );
}
