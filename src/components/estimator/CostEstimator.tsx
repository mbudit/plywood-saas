import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calculator, RefreshCw } from "lucide-react"

export function CostEstimator() {
    const [materialCost, setMaterialCost] = useState<number>(0)
    const [laborCost, setLaborCost] = useState<number>(0)
    const [additionalCost, setAdditionalCost] = useState<number>(0)
    const [markup, setMarkup] = useState<number>(20) // Default 20% markup
    const [totalCost, setTotalCost] = useState<number>(0)
    const [estimatedPrice, setEstimatedPrice] = useState<number>(0)

    useEffect(() => {
        const cost = Number(materialCost) + Number(laborCost) + Number(additionalCost)
        setTotalCost(cost)
        const price = cost * (1 + Number(markup) / 100)
        setEstimatedPrice(price)
    }, [materialCost, laborCost, additionalCost, markup])

    const handleReset = () => {
        setMaterialCost(0)
        setLaborCost(0)
        setAdditionalCost(0)
        setMarkup(20)
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Cost Inputs</CardTitle>
                    <CardDescription>Enter the costs associated with the project.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="material">Material Cost ($)</Label>
                        <Input
                            id="material"
                            type="number"
                            min="0"
                            value={materialCost}
                            onChange={(e) => setMaterialCost(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="labor">Labor Cost ($)</Label>
                        <Input
                            id="labor"
                            type="number"
                            min="0"
                            value={laborCost}
                            onChange={(e) => setLaborCost(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="additional">Additional Cost ($)</Label>
                        <Input
                            id="additional"
                            type="number"
                            min="0"
                            value={additionalCost}
                            onChange={(e) => setAdditionalCost(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="markup">Markup / Profit Margin (%)</Label>
                        <Input
                            id="markup"
                            type="number"
                            min="0"
                            value={markup}
                            onChange={(e) => setMarkup(Number(e.target.value))}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" onClick={handleReset} className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset Values
                    </Button>
                </CardFooter>
            </Card>

            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle>Estimation Summary</CardTitle>
                    <CardDescription>Breakdown of costs and final estimation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Material Cost:</span>
                        <span>${Number(materialCost).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Labor Cost:</span>
                        <span>${Number(laborCost).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Additional Cost:</span>
                        <span>${Number(additionalCost).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                        <span>Total Base Cost:</span>
                        <span>${totalCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Markup ({markup}%):</span>
                        <span>${(estimatedPrice - totalCost).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-primary">
                        <span>Estimated Price:</span>
                        <span>${estimatedPrice.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                        <Calculator className="mr-2 h-4 w-4" />
                        Generate Quote
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
