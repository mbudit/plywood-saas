import type { Employee } from "@/store/dashboardStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface EmployeeListProps {
    employees: Employee[]
}

export function EmployeeList({ employees }: EmployeeListProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {employees.map((employee) => (
                <Card key={employee.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {employee.name}
                        </CardTitle>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground mb-2">{employee.role}</div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Active Tasks</span>
                            <Badge variant="secondary">{employee.activeTasks}</Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
