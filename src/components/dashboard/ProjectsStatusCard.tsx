import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectStatus } from "@/store/dashboardStore"

interface ProjectsStatusCardProps {
    projectsByStatus: Record<ProjectStatus, number>
}

export function ProjectsStatusCard({ projectsByStatus }: ProjectsStatusCardProps) {
    const statusColors: Record<ProjectStatus, string> = {
        'Designing': 'bg-blue-500',
        'Cutting': 'bg-orange-500',
        'Assembly': 'bg-yellow-500',
        'Finishing': 'bg-purple-500',
        'Packaging': 'bg-indigo-500',
        'Completed': 'bg-green-500',
        'Delivered': 'bg-slate-500',
    }

    return (
        <Card className="col-span-1 h-full">
            <CardHeader>
                <CardTitle>Projects by Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(Object.keys(projectsByStatus) as ProjectStatus[]).map((status) => (
                        <div key={status} className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${statusColors[status]}`} />
                            <div className="flex-1 text-sm font-medium">{status}</div>
                            <div className="text-sm text-muted-foreground">{projectsByStatus[status]}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
