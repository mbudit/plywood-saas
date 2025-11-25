import { useDashboardStore } from "@/store/dashboardStore"
import { InventoryList } from "@/components/inventory/InventoryList"
import { useEffect } from "react"

export default function Inventory() {
    const { inventory, fetchDashboardData } = useDashboardStore()

    useEffect(() => {
        // Ensure data is loaded if user navigates directly here
        fetchDashboardData()
    }, [fetchDashboardData])

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
                <p className="text-muted-foreground">
                    Manage your material stock and check for low stock items.
                </p>
            </div>
            <InventoryList items={inventory} />
        </div>
    )
}
