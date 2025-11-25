import { useDashboardStore } from "@/store/dashboardStore"
import { CustomerList } from "@/components/customers/CustomerList"
import { useEffect } from "react"

export default function Customers() {
    const { customers, fetchDashboardData } = useDashboardStore()

    useEffect(() => {
        // Ensure data is loaded if user navigates directly here
        fetchDashboardData()
    }, [fetchDashboardData])

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                <p className="text-muted-foreground">
                    Manage your customers and view their project history.
                </p>
            </div>
            <CustomerList customers={customers} />
        </div>
    )
}
