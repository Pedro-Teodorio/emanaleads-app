"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import React from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
);

export type ChartKind = "bar" | "line";

interface CampaignChartProps {
    kind?: ChartKind;
    title?: string;
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
    }>;
}

export function CampaignChart({ kind = "bar", title, labels, datasets }: Readonly<CampaignChartProps>) {
    const data = {
        labels,
        datasets: datasets.map((d) => ({
            label: d.label,
            data: d.data,
            borderColor: d.borderColor ?? "#1d4ed8",
            backgroundColor: d.backgroundColor ?? "rgba(29,78,216,0.2)",
            tension: 0.3,
        })),
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" as const },
            title: title ? { display: true, text: title } : undefined,
            tooltip: { mode: "index" as const, intersect: false },
        },
        interaction: { mode: "nearest" as const, intersect: false },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "#e5e7eb" } },
        },
    };

    return (
        <div className="w-full h-80">
            {kind === "bar" ? <Bar options={options} data={data} /> : <Line options={options} data={data} />}
        </div>
    );
}

export default CampaignChart;
