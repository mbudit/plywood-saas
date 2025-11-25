import { useDashboardStore, type ProjectStatus, type Project } from "@/store/dashboardStore"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const COLUMNS: { id: ProjectStatus; title: string; color: string; dotColor: string }[] = [
    { id: 'Designing', title: 'Design', color: 'bg-blue-50 dark:bg-blue-950/20', dotColor: 'bg-blue-500' },
    { id: 'Cutting', title: 'Cutting', color: 'bg-yellow-50 dark:bg-yellow-950/20', dotColor: 'bg-yellow-500' },
    { id: 'Assembly', title: 'Assembly', color: 'bg-orange-50 dark:bg-orange-950/20', dotColor: 'bg-orange-500' },
    { id: 'Finishing', title: 'Finishing', color: 'bg-red-50 dark:bg-red-950/20', dotColor: 'bg-red-500' },
    { id: 'Packaging', title: 'Packaging', color: 'bg-purple-50 dark:bg-purple-950/20', dotColor: 'bg-purple-500' },
    { id: 'Delivered', title: 'Delivered', color: 'bg-green-50 dark:bg-green-950/20', dotColor: 'bg-green-500' },
]

export function ProductionBoard() {
    const { projects, updateProjectStatus } = useDashboardStore()

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const newStatus = destination.droppableId as ProjectStatus
        updateProjectStatus(draggableId, newStatus)
    }

    const getProjectsByStatus = (status: ProjectStatus) => {
        return projects.filter((project) => project.status === status)
    }

    return (
        <div className="h-[calc(100vh-12rem)] overflow-x-auto pb-4">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex h-full gap-4 min-w-[1200px]">
                    {COLUMNS.map((column) => (
                        <div
                            key={column.id}
                            className={cn(
                                "flex h-full w-80 flex-col rounded-lg border",
                                column.color
                            )}
                        >
                            <div className="flex items-center justify-between p-4 border-b bg-background/50 backdrop-blur-sm rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <div className={cn("h-3 w-3 rounded-full", column.dotColor)} />
                                    <h3 className="font-semibold">{column.title}</h3>
                                </div>
                                <Badge variant="secondary" className="bg-background/80">
                                    {getProjectsByStatus(column.id).length}
                                </Badge>
                            </div>

                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <ScrollArea className="flex-1">
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={cn(
                                                "flex flex-col gap-3 p-3 min-h-[150px] transition-colors",
                                                snapshot.isDraggingOver ? "bg-accent/20" : ""
                                            )}
                                        >
                                            {getProjectsByStatus(column.id).map((project, index) => (
                                                <Draggable
                                                    key={project.id}
                                                    draggableId={project.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <Card
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={cn(
                                                                "cursor-grab active:cursor-grabbing hover:shadow-md transition-all",
                                                                snapshot.isDragging ? "shadow-lg rotate-2 scale-105" : ""
                                                            )}
                                                        >
                                                            <CardHeader className="p-3 space-y-1">
                                                                <CardTitle className="text-sm font-medium leading-none">
                                                                    {project.name}
                                                                </CardTitle>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {project.client}
                                                                </p>
                                                            </CardHeader>
                                                            <CardContent className="p-3 pt-0">
                                                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                                                                    <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                                                                    <span className="font-medium text-foreground">
                                                                        ${project.value.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </ScrollArea>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    )
}
