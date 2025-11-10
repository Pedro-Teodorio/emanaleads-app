'use client';
import { PageContainer, PageContent, PageDescription, PageHeader, PageTitle } from '@/components/common/Page';
import RecentProjects from '@/features/dashboard/components/RecentProjects';
import StatsCard from '@/features/dashboard/components/StatsCard';
import TeamOverview from '@/features/dashboard/components/TeamOverview';
import { projectsQueries } from '@/features/projects/services/queries';
import { usersQueries } from '@/features/users/services/queries';
import { useQuery } from '@tanstack/react-query';
import { Activity, FolderKanban, Users } from 'lucide-react';


export default function DashboardPage() {
  const { data: usersData, isLoading: isLoadingUsers } = useQuery(usersQueries.list({ page: 1, limit: 10 }));
  const { data: projectsData, isLoading: isLoadingProjects } = useQuery(projectsQueries.all());
  const { data: recentProjectsData, isLoading: isLoadingRecentProjects } = useQuery(projectsQueries.recent());
  const activeProjects = projectsData?.filter((project) => project.status === 'ACTIVE').length || 0;
  const totalProjects = projectsData?.length || 0;

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
            value={usersData?.data.length || 0}
            icon={Users}
            gradient="from-blue-500 to-blue-600"
            loading={isLoadingUsers}
          />
          <StatsCard
            title="Projetos Ativos"
            value={activeProjects}
            icon={Activity}
            gradient="from-green-500 to-green-600"
            loading={isLoadingProjects}
          />
          <StatsCard
            title="Total de Projetos"
            value={totalProjects}
            icon={FolderKanban}
            gradient="from-purple-500 to-purple-600"
            loading={isLoadingProjects}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentProjects projects={recentProjectsData || []} loading={isLoadingRecentProjects} />
          </div>
          <div>
            <TeamOverview users={usersData?.data || []} loading={isLoadingUsers} />
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
