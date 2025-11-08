'use client';
import { PageContainer, PageContent, PageDescription, PageHeader, PageTitle } from '@/components/common/Page';
import RecentProjects from '@/features/dashboard/components/RecentProjects';
import StatsCard from '@/features/dashboard/components/StatsCard';
import TeamOverview from '@/features/dashboard/components/TeamOverview';
import { projects } from '@/mocks/projects';
import { users } from '@/mocks/users';
import { Activity, FolderKanban, Users } from 'lucide-react';


export default function DashboardPage() {
  const activeProjects = projects.filter((project) => project.status === 'active').length;

  return (
    <PageContainer>
      <PageHeader>
        <div className="flex flex-col gap-2">
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Visão geral do sistema Emanaleads
          </PageDescription>
        </div>
      </PageHeader>
      <PageContent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total de Usuários"
            value={users.length}
            icon={Users}
            gradient="from-blue-500 to-blue-600"
            loading={false}
          />
          <StatsCard
            title="Projetos Ativos"
            value={activeProjects}
            icon={Activity}
            gradient="from-green-500 to-green-600"
            loading={false}
          />
          <StatsCard
            title="Total de Projetos"
            value={projects.length}
            icon={FolderKanban}
            gradient="from-purple-500 to-purple-600"
            loading={false}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentProjects projects={projects} loading={false} />
          </div>
          <div>
            <TeamOverview users={users} loading={false} />
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
