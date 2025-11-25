import { create } from 'zustand';

export type ProjectStatus = 'Designing' | 'Cutting' | 'Assembly' | 'Finishing' | 'Packaging' | 'Completed' | 'Delivered';

export interface Project {
    id: string;
    name: string;
    client: string;
    status: ProjectStatus;
    dueDate: string;
    value: number;
    items?: string;
    dimensions?: string;
    materials?: string;
    estimatedFinishDate?: string;
    designUrl?: string;
}

export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    threshold: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface Delivery {
    id: string;
    projectId: string;
    projectName: string;
    address: string;
    date: string;
    status: 'Scheduled' | 'In Transit' | 'Delivered';
}

export interface Employee {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    activeTasks: number;
}

export interface Task {
    id: string;
    title: string;
    assigneeId: string;
    projectId: string;
    projectName: string;
    status: 'Todo' | 'In Progress' | 'Done';
    progress: number;
    dueDate: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    totalProjects: number;
    totalValue: number;
}

export interface Order {
    id: string;
    customerName: string;
    date: string;
    status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
    totalAmount: number;
    items: number;
}

interface DashboardState {
    projects: Project[];
    inventory: InventoryItem[];
    deliveries: Delivery[];
    employees: Employee[];
    tasks: Task[];
    customers: Customer[];
    orders: Order[];
    stats: {
        totalActiveProjects: number;
        revenue: number;
    };
    isLoading: boolean;
    fetchDashboardData: () => Promise<void>;
    addProject: (project: Omit<Project, 'id' | 'status' | 'value'>) => void;
    addOrder: (order: Omit<Order, 'id'>) => void;
    updateProjectStatus: (id: string, status: ProjectStatus) => void;
    getProjectById: (id: string) => Project | undefined;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
    projects: [],
    inventory: [],
    deliveries: [],
    employees: [],
    tasks: [],
    customers: [],
    orders: [],
    stats: {
        totalActiveProjects: 0,
        revenue: 0,
    },
    isLoading: false,
    fetchDashboardData: async () => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Only load initial mock data if store is empty
        if (get().projects.length === 0) {
            const mockProjects: Project[] = [
                { id: '1', name: 'Modern Kitchen Cabinet', client: 'Alice Johnson', status: 'Designing', dueDate: '2023-11-15', value: 5000, items: 'Kitchen Cabinet', dimensions: '3m x 2m', materials: 'Oak Plywood', estimatedFinishDate: '2023-11-15' },
                { id: '2', name: 'Oak Dining Table', client: 'Bob Smith', status: 'Cutting', dueDate: '2023-11-20', value: 1200, items: 'Dining Table', dimensions: '2m x 1m', materials: 'Solid Oak', estimatedFinishDate: '2023-11-20' },
                { id: '3', name: 'Office Desk Set', client: 'TechCorp Inc.', status: 'Assembly', dueDate: '2023-11-10', value: 3500, items: '5 Desks', dimensions: 'Standard', materials: 'MDF', estimatedFinishDate: '2023-11-10' },
                { id: '4', name: 'Bedroom Wardrobe', client: 'Sarah Lee', status: 'Finishing', dueDate: '2023-11-01', value: 2800, items: 'Wardrobe', dimensions: '2.5m x 2m', materials: 'Pine', estimatedFinishDate: '2023-11-01' },
                { id: '5', name: 'Custom Bookshelf', client: 'David Brown', status: 'Packaging', dueDate: '2023-11-25', value: 1500, items: 'Bookshelf', dimensions: '1.5m x 2m', materials: 'Walnut Veneer', estimatedFinishDate: '2023-11-25' },
                { id: '6', name: 'Coffee Table', client: 'Emily White', status: 'Delivered', dueDate: '2023-10-25', value: 800, items: 'Coffee Table', dimensions: '1m x 0.5m', materials: 'Glass & Wood', estimatedFinishDate: '2023-10-25' },
                { id: '7', name: 'Reception Desk', client: 'Hotel Grand', status: 'Designing', dueDate: '2023-12-01', value: 4500, items: 'Reception Desk', dimensions: '3m x 1.2m', materials: 'Marble & Wood', estimatedFinishDate: '2023-12-01' },
                { id: '8', name: 'Conference Table', client: 'BizSolutions', status: 'Cutting', dueDate: '2023-12-05', value: 3200, items: 'Conference Table', dimensions: '4m x 1.5m', materials: 'Teak', estimatedFinishDate: '2023-12-05' },
                { id: '9', name: 'TV Unit', client: 'Mark Wilson', status: 'Assembly', dueDate: '2023-11-28', value: 1800, items: 'TV Unit', dimensions: '2m x 0.5m', materials: 'Plywood', estimatedFinishDate: '2023-11-28' },
                { id: '10', name: 'Shoe Rack', client: 'Linda Green', status: 'Finishing', dueDate: '2023-11-30', value: 600, items: 'Shoe Rack', dimensions: '1m x 0.4m', materials: 'Engineered Wood', estimatedFinishDate: '2023-11-30' },
                { id: '11', name: 'Study Table', client: 'James Miller', status: 'Packaging', dueDate: '2023-11-22', value: 900, items: 'Study Table', dimensions: '1.2m x 0.6m', materials: 'Rubberwood', estimatedFinishDate: '2023-11-22' },
                { id: '12', name: 'Bar Counter', client: 'The Lounge', status: 'Designing', dueDate: '2023-12-10', value: 5500, items: 'Bar Counter', dimensions: '3.5m x 1.2m', materials: 'Granite & Wood', estimatedFinishDate: '2023-12-10' },
            ];

            const mockInventory: InventoryItem[] = [
                { id: '1', name: 'Oak Plywood Sheet 18mm', quantity: 5, unit: 'sheets', threshold: 10, status: 'Low Stock' },
                { id: '2', name: 'Walnut Veneer', quantity: 20, unit: 'sqm', threshold: 15, status: 'In Stock' },
                { id: '3', name: 'Soft Close Hinges', quantity: 12, unit: 'pairs', threshold: 20, status: 'Low Stock' },
                { id: '4', name: 'Matte Varnish', quantity: 2, unit: 'liters', threshold: 5, status: 'Low Stock' },
                { id: '5', name: 'Drawer Slides', quantity: 50, unit: 'pairs', threshold: 10, status: 'In Stock' },
            ];

            const mockDeliveries: Delivery[] = [
                { id: '1', projectId: '3', projectName: 'Office Desk Set', address: '123 Tech Park, Innovation City', date: '2023-11-12', status: 'Scheduled' },
                { id: '2', projectId: '1', projectName: 'Modern Kitchen Cabinet', address: '45 Maple Ave, Suburbia', date: '2023-11-18', status: 'Scheduled' },
            ];

            const mockEmployees: Employee[] = [
                { id: '1', name: 'Mike Carpenter', role: 'Master Carpenter', activeTasks: 3 },
                { id: '2', name: 'Steve Saw', role: 'Cutter', activeTasks: 2 },
                { id: '3', name: 'Anna Assemble', role: 'Assembler', activeTasks: 4 },
                { id: '4', name: 'Phil Finish', role: 'Finisher', activeTasks: 1 },
            ];

            const mockTasks: Task[] = [
                { id: '1', title: 'Cut panels for Kitchen Cabinet', assigneeId: '2', projectId: '1', projectName: 'Modern Kitchen Cabinet', status: 'Done', progress: 100, dueDate: '2023-11-10' },
                { id: '2', title: 'Assemble Kitchen Cabinet frames', assigneeId: '3', projectId: '1', projectName: 'Modern Kitchen Cabinet', status: 'In Progress', progress: 60, dueDate: '2023-11-12' },
                { id: '3', title: 'Cut legs for Dining Table', assigneeId: '2', projectId: '2', projectName: 'Oak Dining Table', status: 'In Progress', progress: 40, dueDate: '2023-11-18' },
                { id: '4', title: 'Varnish Wardrobe doors', assigneeId: '4', projectId: '4', projectName: 'Bedroom Wardrobe', status: 'Todo', progress: 0, dueDate: '2023-11-01' },
                { id: '5', title: 'Assemble Office Desks', assigneeId: '3', projectId: '3', projectName: 'Office Desk Set', status: 'In Progress', progress: 80, dueDate: '2023-11-08' },
            ];

            const mockCustomers: Customer[] = [
                { id: '1', name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', address: '123 Maple St', totalProjects: 1, totalValue: 5000 },
                { id: '2', name: 'Bob Smith', email: 'bob@example.com', phone: '555-0102', address: '456 Oak Ave', totalProjects: 1, totalValue: 1200 },
                { id: '3', name: 'TechCorp Inc.', email: 'contact@techcorp.com', phone: '555-0103', address: '789 Tech Blvd', totalProjects: 1, totalValue: 3500 },
                { id: '4', name: 'Sarah Lee', email: 'sarah@example.com', phone: '555-0104', address: '321 Pine Ln', totalProjects: 1, totalValue: 2800 },
                { id: '5', name: 'David Brown', email: 'david@example.com', phone: '555-0105', address: '654 Cedar Rd', totalProjects: 1, totalValue: 1500 },
                { id: '6', name: 'Emily White', email: 'emily@example.com', phone: '555-0106', address: '987 Birch Dr', totalProjects: 1, totalValue: 800 },
            ];

            const mockOrders: Order[] = [
                { id: 'ORD-001', customerName: 'Alice Johnson', date: '2023-11-01', status: 'Completed', totalAmount: 5000, items: 1 },
                { id: 'ORD-002', customerName: 'Bob Smith', date: '2023-11-05', status: 'Processing', totalAmount: 1200, items: 1 },
                { id: 'ORD-003', customerName: 'TechCorp Inc.', date: '2023-11-10', status: 'Pending', totalAmount: 3500, items: 5 },
                { id: 'ORD-004', customerName: 'Sarah Lee', date: '2023-11-12', status: 'Processing', totalAmount: 2800, items: 1 },
                { id: 'ORD-005', customerName: 'David Brown', date: '2023-11-15', status: 'Cancelled', totalAmount: 1500, items: 1 },
            ];

            set({
                projects: mockProjects,
                inventory: mockInventory,
                deliveries: mockDeliveries,
                employees: mockEmployees,
                tasks: mockTasks,
                customers: mockCustomers,
                orders: mockOrders,
                stats: {
                    totalActiveProjects: mockProjects.filter(p => p.status !== 'Completed').length,
                    revenue: mockProjects.reduce((acc, curr) => acc + curr.value, 0),
                },
                isLoading: false,
            });
        } else {
            set({ isLoading: false });
        }
    },
    addProject: (newProjectData) => {
        const newProject: Project = {
            ...newProjectData,
            id: Math.random().toString(36).substr(2, 9),
            status: 'Designing',
            value: 0, // Default value, could be calculated or input
        };
        set((state) => ({
            projects: [...state.projects, newProject],
            stats: {
                ...state.stats,
                totalActiveProjects: state.stats.totalActiveProjects + 1,
            }
        }));
    },
    addOrder: (newOrderData) => {
        const newOrder: Order = {
            ...newOrderData,
            id: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
        };
        set((state) => ({
            orders: [newOrder, ...state.orders],
        }));
    },
    updateProjectStatus: (id, status) => {
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === id ? { ...p, status } : p
            ),
        }));
    },
    getProjectById: (id) => {
        return get().projects.find((p) => p.id === id);
    },
}));
