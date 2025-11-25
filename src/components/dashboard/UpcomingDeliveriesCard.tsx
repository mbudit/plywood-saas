import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Delivery } from "@/store/dashboardStore"
import { Truck, Calendar } from "lucide-react"

interface UpcomingDeliveriesCardProps {
    deliveries: Delivery[]
}

export function UpcomingDeliveriesCard({ deliveries }: UpcomingDeliveriesCardProps) {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-500" />
                    Upcoming Deliveries
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {deliveries.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No upcoming deliveries.</p>
                    ) : (
                        deliveries.map((delivery) => (
                            <div key={delivery.id} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0 last:pb-0">
                                <div className="font-medium text-sm">{delivery.projectName}</div>
                                <div className="text-xs text-muted-foreground truncate">{delivery.address}</div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(delivery.date).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
