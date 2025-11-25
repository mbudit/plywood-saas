import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { InventoryItem } from "@/store/dashboardStore"
import { AlertTriangle } from "lucide-react"

interface LowStockCardProps {
    items: InventoryItem[]
}

export function LowStockCard({ items }: LowStockCardProps) {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Low Stock Items
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {items.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No items are low on stock.</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                                <div>
                                    <div className="font-medium text-sm">{item.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {item.quantity} {item.unit} remaining
                                    </div>
                                </div>
                                <Badge variant="destructive">Low</Badge>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
