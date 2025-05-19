"use client"

import {
  ShoppingBag,
  DollarSign,
  Coffee,
  Clock,
  Users,
} from "lucide-react"
import "../Content.css"
import DashboardCard from "./DashboardCard";
import DashboardSection from "./DashboardSection";

const Dashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 dashboard-grid">
      <DashboardCard
        title="Total Orders"
        value="156"
        change="+12.5%"
        icon={<ShoppingBag className="h-6 w-6 text-indigo-600" />}
        color="bg-indigo-100"
        bgColor="card-gradient-indigo"
      />
      <DashboardCard
        title="Total Revenue"
        value="$4,320"
        change="+8.2%"
        icon={<DollarSign className="h-6 w-6 text-green-600" />}
        color="bg-green-100"
        bgColor="card-gradient-green"
      />
      <DashboardCard
        title="Active Tables"
        value="12/20"
        change="-2"
        icon={<Coffee className="h-6 w-6 text-blue-600" />}
        color="bg-blue-100"
        bgColor="card-gradient-blue"
      />
      <DashboardCard
        title="Pending Orders"
        value="8"
        change="+3"
        icon={<Clock className="h-6 w-6 text-amber-600" />}
        color="bg-amber-100"
        bgColor="card-gradient-amber"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <DashboardSection title="Recent Orders" icon={<ShoppingBag className="h-5 w-5" />}>
          <div className="space-y-4">
            <div className="order-item">
              <div className="order-info">
                <div className="order-icon">
                  <Coffee className="h-5 w-5" />
                </div>
                <div className="order-details">
                  <p>Table A1</p>
                  <p className="order-meta">2 items • 10 mins ago</p>
                </div>
              </div>
              <span className="order-status status-pending">Pending</span>
            </div>

            <div className="order-item">
              <div className="order-info">
                <div className="order-icon">
                  <Coffee className="h-5 w-5" />
                </div>
                <div className="order-details">
                  <p>Table B2</p>
                  <p className="order-meta">1 item • 15 mins ago</p>
                </div>
              </div>
              <span className="order-status status-completed">Completed</span>
            </div>

            <div className="order-item">
              <div className="order-info">
                <div className="order-icon">
                  <Coffee className="h-5 w-5" />
                </div>
                <div className="order-details">
                  <p>Table C3</p>
                  <p className="order-meta">3 items • 20 mins ago</p>
                </div>
              </div>
              <span className="order-status status-progress">In Progress</span>
            </div>
          </div>
        </DashboardSection>
      </div>

      <div>
        <DashboardSection title="Active Staff" icon={<Users className="h-5 w-5" />}>
          <div className="space-y-4">
            <div className="staff-item">
              <div className="staff-avatar avatar-indigo">
                <span>JD</span>
              </div>
              <div className="staff-info">
                <p>John Doe</p>
                <p className="staff-meta">Waiter • On shift</p>
              </div>
            </div>

            <div className="staff-item">
              <div className="staff-avatar avatar-green">
                <span>AS</span>
              </div>
              <div className="staff-info">
                <p>Alice Smith</p>
                <p className="staff-meta">Chef • On shift</p>
              </div>
            </div>

            <div className="staff-item">
              <div className="staff-avatar avatar-amber">
                <span>RJ</span>
              </div>
              <div className="staff-info">
                <p>Robert Johnson</p>
                <p className="staff-meta">Manager • On shift</p>
              </div>
            </div>
          </div>
        </DashboardSection>
      </div>
    </div>
  </div>
)

export default Dashboard;
