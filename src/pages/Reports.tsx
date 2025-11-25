import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, LineChart, PieChart } from "lucide-react"

export default function Reports() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                <p className="text-muted-foreground">
                    View insights and analytics for your business.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            <CardTitle>Production Report</CardTitle>
                        </div>
                        <CardDescription>
                            Analysis of production efficiency and project timelines.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center min-h-[200px] bg-muted/20 m-6 rounded-md border border-dashed">
                        <div className="text-center text-muted-foreground">
                            <p className="text-sm font-medium">Production Chart Placeholder</p>
                            <p className="text-xs">Coming Soon</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-primary" />
                            <CardTitle>Inventory Usage</CardTitle>
                        </div>
                        <CardDescription>
                            Breakdown of material consumption and stock levels.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center min-h-[200px] bg-muted/20 m-6 rounded-md border border-dashed">
                        <div className="text-center text-muted-foreground">
                            <p className="text-sm font-medium">Inventory Chart Placeholder</p>
                            <p className="text-xs">Coming Soon</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <LineChart className="h-5 w-5 text-primary" />
                            <CardTitle>Sales Report</CardTitle>
                        </div>
                        <CardDescription>
                            Revenue trends and project value analysis.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center min-h-[200px] bg-muted/20 m-6 rounded-md border border-dashed">
                        <div className="text-center text-muted-foreground">
                            <p className="text-sm font-medium">Sales Chart Placeholder</p>
                            <p className="text-xs">Coming Soon</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
