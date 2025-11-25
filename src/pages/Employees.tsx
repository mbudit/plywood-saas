import { useDashboardStore } from "@/store/dashboardStore"
import { EmployeeList } from "@/components/employees/EmployeeList"
import { TaskList } from "@/components/employees/TaskList"
import { useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Employees() {
    const { employees, tasks, fetchDashboardData } = useDashboardStore()

    useEffect(() => {
        // Ensure data is loaded if user navigates directly here
        fetchDashboardData()
    }, [fetchDashboardData])

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Team & Tasks</h2>
                <p className="text-muted-foreground">
                    Manage your team members and track their assigned tasks.
                </p>
            </div>

            <Tabs defaultValue="team" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="team">Team Members</TabsTrigger>
                    <TabsTrigger value="tasks">All Tasks</TabsTrigger>
                </TabsList>
                <TabsContent value="team" className="space-y-4">
                    <EmployeeList employees={employees} />
                </TabsContent>
                <TabsContent value="tasks" className="space-y-4">
                    <TaskList tasks={tasks} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
