export interface Project {
  id: string;
  name: string;
  description: string;
  status: keyof typeof statusConfig;
  start_date: string;
  admin_id: string;
}

export interface RecentProjectsProps {
  projects: Project[];
  loading: boolean;
}

export const statusConfig = {
  planning: { label: "Planejamento", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  active: { label: "Ativo", color: "bg-green-100 text-green-800 border-green-200" },
  paused: { label: "Pausado", color: "bg-orange-100 text-orange-800 border-orange-200" },
  completed: { label: "Concluído", color: "bg-blue-100 text-blue-800 border-blue-200" },
};
 export const projects: Project[] = [
    {
      id: '1',
      name: 'Projeto A',
      status: 'active',
      description: 'Projeto A é um projeto ativo com 10 tarefas e 5 tarefas concluídas.',
      start_date: '2023-01-01',
      admin_id: '1',
    },
    {
      id: '2',
      name: 'Projeto B',
      status: 'active',
      description: 'Projeto B é um projeto ativo com 8 tarefas e 4 tarefas concluídas.',
      start_date: '2023-02-01',
      admin_id: '2',
    },
    {
      id: '3',
      name: 'Projeto C',
      status: 'completed',
      description: 'Projeto C é um projeto concluído com 12 tarefas e 12 tarefas concluídas.',
      start_date: '2023-03-01',
      admin_id: '3',
    },
    {
      id: '4',
      name: 'Projeto D',
      status: 'paused',
      description: 'Projeto D é um projeto pausado com 6 tarefas e 3 tarefas concluídas.',
      start_date: '2023-04-01',
      admin_id: '2',
    },
    {
      id: '5',
      name: 'Projeto E',
      status: 'planning',
      description: 'Projeto E é um projeto em planejamento com 4 tarefas e 0 tarefas concluídas.',
      start_date: '2023-05-01',
      admin_id: '2',
    },
    {
      id: '6',
      name: 'Projeto F',
      status: 'active',
      description: 'Projeto F é um projeto ativo com 10 tarefas e 5 tarefas concluídas.',
      start_date: '2023-06-01',
      admin_id: '3',
    },
  ];