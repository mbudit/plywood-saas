import { useDashboardStore } from "@/store/dashboardStore"
import { OrderList } from "@/components/orders/OrderList"
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog"
import { useEffect } from "react"

export default function Orders() {
    const { orders, fetchDashboardData } = useDashboardStore()

    useEffect(() => {
        // Ensure data is loaded if user navigates directly here
        fetchDashboardData()
    }, [fetchDashboardData])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                    <p className="text-muted-foreground">
                        Manage customer orders and track their status.
                    </p>
                </div>
                <CreateOrderDialog />
            </div>
            <OrderList orders={orders} />
        </div>
    )
}
