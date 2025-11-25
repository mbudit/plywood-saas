import { useParams, Link } from "react-router-dom"
import { useDashboardStore } from "@/store/dashboardStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, User, Box, Ruler, Hammer, FileText } from "lucide-react"
import { useEffect } from "react"

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>()
    const { getProjectById, fetchDashboardData } = useDashboardStore()
    const project = getProjectById(id || "")

    useEffect(() => {
        // Ensure data is loaded
        fetchDashboardData()
    }, [fetchDashboardData])

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <h2 className="text-2xl font-bold">Project not found</h2>
                <Button asChild>
                    <Link to="/projects">Back to Projects</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link to="/projects">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{project.name}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-sm">ID: {project.id}</span>
                        <Badge variant="outline">{project.status}</Badge>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" /> Client Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Client Name</div>
                            <div className="text-lg">{project.client}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Deadline</div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5" /> Project Specifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Box className="h-4 w-4" /> Items Requested
                            </div>
                            <div>{project.items || "N/A"}</div>
                        </div>
                        <Separator />
                        <div>
                            <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Ruler className="h-4 w-4" /> Dimensions
                            </div>
                            <div>{project.dimensions || "N/A"}</div>
                        </div>
                        <Separator />
                        <div>
                            <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Hammer className="h-4 w-4" /> Materials
                            </div>
                            <div>{project.materials || "N/A"}</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" /> Design & Files
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {project.designUrl ? (
                            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                                <FileText className="h-8 w-8 text-blue-500" />
                                <div>
                                    <div className="font-medium">Design File</div>
                                    <div className="text-xs text-muted-foreground">Uploaded on {new Date().toLocaleDateString()}</div>
                                </div>
                                <Button variant="outline" size="sm" className="ml-auto" asChild>
                                    <a href={project.designUrl} target="_blank" rel="noopener noreferrer">View</a>
                                </Button>
                            </div>
                        ) : (
                            <div className="text-muted-foreground text-sm">No design files uploaded.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
