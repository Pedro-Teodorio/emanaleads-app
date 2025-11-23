"use client";

import CampaignChart from "@/components/common/charts/CampaignChart";
import { PageContainer, PageContent, PageHeader, PageTitle, PageDescription } from "@/components/common/Page";

export default function ProjectDetailsPage() {
    // Stub inicial de detalhes de projeto com um gráfico exemplo
    const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    return (
        <PageContainer>
            <PageHeader>
                <div className="flex flex-col gap-2">
                    <PageTitle>Detalhes do Projeto</PageTitle>
                    <PageDescription>Visão geral e performance de campanhas</PageDescription>
                </div>
            </PageHeader>
            <PageContent container>
                <div className="grid grid-cols-1 gap-6">
                    <div className="rounded-xl border border-slate-200 p-4 bg-white">
                        <CampaignChart
                            kind="line"
                            title="Conversões por mês (exemplo)"
                            labels={labels}
                            datasets={[
                                { label: "Conversões", data: [12, 18, 9, 22, 30, 26], borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.2)" },
                            ]}
                        />
                    </div>
                </div>
            </PageContent>
        </PageContainer>
    );
}
