"use client"

import { BookOpen } from "lucide-react"
import "./Content.css"
import Dashboard from "./Dashboard/Dashboard"
import UserManagement from "./UserSection"
import OrdersManagement from "./OrderSection"
import MenuManager from "./MenuManager"
import PaymentSection from "./PaymentSection"
import ReportSection from "./ReportSection"

const Content = ({ selectedPage }) => {
  switch (selectedPage) {
    case "dashboard":
      return <Dashboard />
    case "user":
      return <UserManagement />
    case "menu":
      return <MenuManager icon={<BookOpen className="h-5 w-5" />} />
    case "order":
      return <OrdersManagement />
    case "payment":
      return <PaymentSection />
    case "reports":
      return <ReportSection />
    default:
      return <Dashboard />
  }
}

export default Content
