import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from 'motion/react'
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    gradient: string;
    loading?: boolean;
}

export default function StatsCard({ title, value, icon: Icon, gradient, loading = false }: StatsCardProps) {
    if (loading) {
        return (
            <Card className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                        <Skeleton className="w-12 h-12 rounded-xl" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-600">{title}</p>
                            <p className="text-3xl font-bold text-slate-900">{value}</p>
                        </div>
                        <div className={`p-3 rounded-xl bg-linear-to-br ${gradient} shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}