import { Search } from "lucide-react"
import "./Header.css"

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header header-gradient text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Quản lý nhà hàng</h1>
        </div>

        {/* <div className="search-container">
          <Search className="search-icon h-4 w-4" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div> */}
      </div>
    </header>
  )
}

export default Header

