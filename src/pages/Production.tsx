import { useDashboardStore } from "@/store/dashboardStore"
import { ProductionBoard } from "@/components/production/ProductionBoard"
import { useEffect } from "react"

export default function Production() {
    const { fetchDashboardData } = useDashboardStore()

    useEffect(() => {
        // Ensure data is loaded if user navigates directly here
        fetchDashboardData()
    }, [fetchDashboardData])

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Production</h2>
                <p className="text-muted-foreground">
                    Track projects through the production workflow.
                </p>
            </div>
            <ProductionBoard />
        </div>
    )
}
