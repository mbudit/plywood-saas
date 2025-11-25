import { useDashboardStore } from "@/store/dashboardStore"
import { ProjectList } from "@/components/projects/ProjectList"
import { CreateProjectDialog } from "@/components/projects/CreateProjectDialog"
import { useEffect } from "react"

export default function Projects() {
    const { projects, fetchDashboardData } = useDashboardStore()

    useEffect(() => {
        // Ensure data is loaded if user navigates directly here
        fetchDashboardData()
    }, [fetchDashboardData])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-muted-foreground">
                        Manage your woodworking projects and orders.
                    </p>
                </div>
                <CreateProjectDialog />
            </div>
            <ProjectList projects={projects} />
        </div>
    )
}
