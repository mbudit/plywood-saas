import { CostEstimator } from "@/components/estimator/CostEstimator"

export default function Estimator() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Cost Estimator</h2>
                <p className="text-muted-foreground">
                    Calculate project costs and generate quotations.
                </p>
            </div>
            <CostEstimator />
        </div>
    )
}
