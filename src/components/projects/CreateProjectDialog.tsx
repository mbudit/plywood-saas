import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useDashboardStore } from "@/store/dashboardStore"
import { useState } from "react"
import { Plus } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Project name must be at least 2 characters.",
    }),
    client: z.string().min(2, {
        message: "Client name must be at least 2 characters.",
    }),
    items: z.string().min(1, {
        message: "Items requested is required.",
    }),
    dimensions: z.string().min(1, {
        message: "Dimensions are required.",
    }),
    materials: z.string().min(1, {
        message: "Materials are required.",
    }),
    estimatedFinishDate: z.string().refine((date) => new Date(date) > new Date(), {
        message: "Estimated finish date must be in the future.",
    }),
    designUrl: z.string().optional(),
})

export function CreateProjectDialog() {
    const [open, setOpen] = useState(false)
    const addProject = useDashboardStore((state) => state.addProject)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            client: "",
            items: "",
            dimensions: "",
            materials: "",
            estimatedFinishDate: "",
            designUrl: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        addProject({
            ...values,
            dueDate: values.estimatedFinishDate, // Using estimated finish date as due date for now
        })
        setOpen(false)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new woodworking project.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Custom Wardrobe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="client"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="items"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Items Requested</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Wardrobe 3m" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dimensions"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dimensions</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. 300x200x60cm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="materials"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Materials</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="e.g. Oak Plywood, Matte Varnish" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="estimatedFinishDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estimated Finish Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="designUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Design (Optional)</FormLabel>
                                    <FormControl>
                                        <Input type="file" className="cursor-pointer" onChange={() => {
                                            // Mock file upload
                                            field.onChange("https://example.com/mock-design.pdf")
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Create Project</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
