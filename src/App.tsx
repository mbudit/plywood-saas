import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import Dashboard from '@/pages/Dashboard'
import Projects from '@/pages/Projects'
import ProjectDetails from '@/pages/ProjectDetails'
import Production from '@/pages/Production'
import Inventory from '@/pages/Inventory'
import Employees from '@/pages/Employees'
import Customers from '@/pages/Customers'
import Estimator from '@/pages/Estimator'
import Reports from '@/pages/Reports'
import Orders from '@/pages/Orders'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* Placeholders for other routes */}
          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path=":id" element={<ProjectDetails />} />
          </Route>
          <Route path="production" element={<Production />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="employees" element={<Employees />} />
          <Route path="customers" element={<Customers />} />
          <Route path="estimator" element={<Estimator />} />
          <Route path="reports" element={<Reports />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<div>Settings Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
