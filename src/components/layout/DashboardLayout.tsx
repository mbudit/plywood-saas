import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarRail } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Outlet, Link, useLocation } from "react-router-dom"
import {
    LayoutDashboard,
    FolderKanban,
    Package,
    ShoppingCart,
    Settings,
    User,
    LogOut,
    Factory,
    Users,
    Calculator,
    BarChart3
} from "lucide-react"

export function DashboardLayout() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
                <Sidebar>
                    <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center px-6">
                        <div className="flex items-center gap-2 font-bold text-xl text-sidebar-primary">
                            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
                                P
                            </div>
                            <span>PlyManager</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent className="px-4 py-6">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/")} tooltip="Dashboard">
                                    <Link to="/">
                                        <LayoutDashboard />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/projects")} tooltip="Projects">
                                    <Link to="/projects">
                                        <FolderKanban />
                                        <span>Projects</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/production")} tooltip="Production">
                                    <Link to="/production">
                                        <Factory />
                                        <span>Production</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/inventory")} tooltip="Inventory">
                                    <Link to="/inventory">
                                        <Package />
                                        <span>Inventory</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/employees")} tooltip="Team">
                                    <Link to="/employees">
                                        <Users />
                                        <span>Team</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/customers")} tooltip="Customers">
                                    <Link to="/customers">
                                        <User />
                                        <span>Customers</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/estimator")} tooltip="Estimator">
                                    <Link to="/estimator">
                                        <Calculator />
                                        <span>Estimator</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/reports")} tooltip="Reports">
                                    <Link to="/reports">
                                        <BarChart3 />
                                        <span>Reports</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive("/orders")} tooltip="Orders">
                                    <Link to="/orders">
                                        <ShoppingCart />
                                        <span>Orders</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter className="p-4 border-t border-sidebar-border">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Settings">
                                    <Link to="/settings">
                                        <Settings />
                                        <span>Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                    <SidebarRail />
                </Sidebar>

                <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <header className="h-16 border-b bg-card px-6 flex items-center justify-between sticky top-0 z-10">
                        <h1 className="text-lg font-semibold text-foreground">
                            {location.pathname === "/" ? "Dashboard" :
                                location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground">
                                    <User size={16} />
                                </div>
                                <span className="hidden md:inline">John Doe</span>
                            </div>
                            <Separator orientation="vertical" className="h-6" />
                            <button className="text-muted-foreground hover:text-foreground transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </header>
                    <div className="flex-1 overflow-auto p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}
