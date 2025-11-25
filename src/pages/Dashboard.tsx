import { useEffect } from "react"
import { useDashboardStore } from "@/store/dashboardStore"
import { StatCard } from "@/components/dashboard/StatCard"
import { ProjectsStatusCard } from "@/components/dashboard/ProjectsStatusCard"
import { DashboardCharts } from "@/components/dashboard/DashboardCharts"
import { LowStockCard } from "@/components/dashboard/LowStockCard"
import { UpcomingDeliveriesCard } from "@/components/dashboard/UpcomingDeliveriesCard"
import { FolderKanban, DollarSign, Package, Users } from "lucide-react"

export default function Dashboard() {
    const {
        projects,
        inventory,
        deliveries,
        stats,
        customers,
        isLoading,
        fetchDashboardData
    } = useDashboardStore()

    useEffect(() => {
        fetchDashboardData()
    }, [fetchDashboardData])

    if (isLoading) {
        return <div className="flex items-center justify-center h-full">Loading dashboard...</div>
    }

    const projectsByStatus = projects.reduce((acc, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    // Ensure all statuses are present
    const statusCounts = {
        'Designing': projectsByStatus['Designing'] || 0,
        'Cutting': projectsByStatus['Cutting'] || 0,
        'Assembly': projectsByStatus['Assembly'] || 0,
        'Finishing': projectsByStatus['Finishing'] || 0,
        'Packaging': projectsByStatus['Packaging'] || 0,
        'Completed': projectsByStatus['Completed'] || 0,
        'Delivered': projectsByStatus['Delivered'] || 0,
    }

    const lowStockItems = inventory.filter(item => item.status === 'Low Stock')

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Active Projects"
                    value={stats.totalActiveProjects}
                    icon={FolderKanban}
                    description="Currently in progress"
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.revenue.toLocaleString()}`}
                    icon={DollarSign}
                    trend={{ value: 12, label: "from last month", positive: true }}
                />
                <StatCard
                    title="Low Stock Items"
                    value={lowStockItems.length}
                    icon={Package}
                    description="Items below threshold"
                    trend={{ value: 2, label: "new items", positive: false }}
                />
                <StatCard
                    title="Total Customers"
                    value={customers.length}
                    icon={Users}
                    description="Active clients"
                    trend={{ value: 4, label: "new this month", positive: true }}
                />
            </div>

            <DashboardCharts />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ProjectsStatusCard projectsByStatus={statusCounts} />
                <UpcomingDeliveriesCard deliveries={deliveries} />
                <LowStockCard items={lowStockItems} />
            </div>
        </div>
    )
}
