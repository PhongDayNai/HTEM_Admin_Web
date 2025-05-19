// "use client"
// import { Users, BookOpen, ShoppingBag, CreditCard, Home, Settings, HelpCircle, LogOut } from "lucide-react"
// import "./SideBar.css"

// const Sidebar = ({ onSelect, selectedPage, isOpen }) => {
//   const menuItems = [
//     { id: "dashboard", label: "Trang chủ", icon: <Home className="h-5 w-5" /> },
//     { id: "user", label: "Thành viên", icon: <Users className="h-5 w-5" /> },
//     { id: "menu", label: "Menu", icon: <BookOpen className="h-5 w-5" /> },
//     { id: "order", label: "Đơn hàng", icon: <ShoppingBag className="h-5 w-5" /> },
//     { id: "payment", label: "Thanh toán", icon: <CreditCard className="h-5 w-5" /> },
//     { id: "settings", label: "Cài đặt", icon: <Settings className="h-5 w-5" /> },
//   ]

//   return (
//     <>
//       {isOpen && <div className="sidebar-overlay lg:hidden" onClick={() => onSelect(false)}></div>}
//       <div className={`sidebar ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
//         <div className="sidebar-container">
//           <div className="sidebar-header">
//             <h2 className="sidebar-logo">Sashimi BBQ Garden</h2>
//           </div>

//           <div className="user-profile">
//             <div className="profile-avatar">
//               <span>A</span>
//             </div>
//             <div className="profile-info">
//               <p className="profile-name">Admin User</p>
//               <p className="profile-email">admin@example.com</p>
//             </div>
//           </div>

//           <nav className="sidebar-nav">
//             {menuItems.map((item) => (
//               <a
//                 key={item.id}
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault()
//                   onSelect(item.id)
//                 }}
//                 className={`nav-item ${selectedPage === item.id ? "active" : ""}`}
//               >
//                 <span className="nav-icon">{item.icon}</span>
//                 <span>{item.label}</span>
//                 {selectedPage === item.id && <span className="nav-active-indicator"></span>}
//               </a>
//             ))}
//           </nav>

//           <div className="sidebar-footer">
//             <a href="#" className="footer-link">
//               <HelpCircle className="h-5 w-5 mr-3" />
//               <span className="footer-text">Hỗ trợ</span>
//             </a>
//             <a href="#" className="footer-link">
//               <LogOut className="h-5 w-5 mr-3" />
//               <span className="footer-text">Đăng xuất</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Sidebar

"use client"
import { Users, BookOpen, ShoppingBag, CreditCard, Home, BarChart, HelpCircle, LogOut } from "lucide-react"
import "./SideBar.css"

const Sidebar = ({ onSelect, selectedPage, isOpen }) => {
  const menuItems = [
    { id: "dashboard", label: "Trang chủ", icon: <Home className="h-5 w-5" /> },
    { id: "user", label: "Thành viên", icon: <Users className="h-5 w-5" /> },
    { id: "menu", label: "Menu", icon: <BookOpen className="h-5 w-5" /> },
    { id: "order", label: "Đơn hàng", icon: <ShoppingBag className="h-5 w-5" /> },
    { id: "payment", label: "Thanh toán", icon: <CreditCard className="h-5 w-5" /> },
    { id: "reports", label: "Báo cáo", icon: <BarChart className="h-5 w-5" /> },
  ]

  return (
    <>
      {isOpen && <div className="sidebar-overlay lg:hidden" onClick={() => onSelect(false)}></div>}
      <div className={`sidebar ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="sidebar-container">
          <div className="sidebar-header">
            <h2 className="sidebar-logo">Sashimi BBQ Garden</h2>
          </div>

          <div className="user-profile">
            <div className="profile-avatar">
              <span>A</span>
            </div>
            <div className="profile-info">
              <p className="profile-name">Admin User</p>
              <p className="profile-email">admin@example.com</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(item.id)
                }}
                className={`nav-item ${selectedPage === item.id ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
                {selectedPage === item.id && <span className="nav-active-indicator"></span>}
              </a>
            ))}
          </nav>

          <div className="sidebar-footer">
            <a href="#" className="footer-link">
              <HelpCircle className="h-5 w-5 mr-3" />
              <span className="footer-text">Hỗ trợ</span>
            </a>
            <a href="#" className="footer-link">
              <LogOut className="h-5 w-5 mr-3" />
              <span className="footer-text">Đăng xuất</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
