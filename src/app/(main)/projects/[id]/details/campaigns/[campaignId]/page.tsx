"use client";

import CampaignChart from "@/components/common/charts/CampaignChart";
import { PageContainer, PageContent, PageHeader, PageTitle, PageDescription } from "@/components/common/Page";

export default function CampaignDetailsPage() {
    const labels = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
    return (
        <PageContainer>
            <PageHeader>
                <div className="flex flex-col gap-2">
                    <PageTitle>Campanha</PageTitle>
                    <PageDescription>Gráficos dinâmicos da campanha (exemplo)</PageDescription>
                </div>
            </PageHeader>
            <PageContent container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-slate-200 p-4 bg-white">
                        <CampaignChart
                            kind="bar"
                            title="Cliques"
                            labels={labels}
                            datasets={[{ label: "Cliques", data: [320, 420, 380, 450], backgroundColor: "rgba(99,102,241,0.4)", borderColor: "#6366f1" }]}
                        />
                    </div>
                    <div className="rounded-xl border border-slate-200 p-4 bg-white">
                        <CampaignChart
                            kind="line"
                            title="Conversões"
                            labels={labels}
                            datasets={[{ label: "Conversões", data: [24, 31, 27, 35], backgroundColor: "rgba(16,185,129,0.3)", borderColor: "#10b981" }]}
                        />
                    </div>
                </div>
            </PageContent>
        </PageContainer>
    );
}
