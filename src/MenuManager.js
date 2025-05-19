"use client";

import { useState, useEffect, useMemo } from "react";
import "./Content.css";

const MenuManager = ({ icon }) => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSet, setExpandedSet] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/buffets/menu", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Lỗi: ${response.status}`);
      }

      const data = await response.json();
      setMenuData(data.setList || []);
      setError(null);
    } catch (err) {
      console.error("Lấy dữ liệu menu thất bại:", err);
      setError("Không thể tải dữ liệu menu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getImagePath = useMemo(() => {
    return (setName) => {
      console.log(setName);
      if (setName === "Hotpot") {
        return "/assets/Buffet_Lau.png";
      } else if (setName === "Seafood Hotpot") {
        return "/assets/Buffet_Lau_Hai_San.png";
      } else if (setName === "BBQ") {
        return "/assets/Buffet_BBQ.png";
      } else if (setName.startsWith("Sashimi")) {
        const formattedName = setName.replace(/\s+/g, "_");
        console.log(`/assets/Buffet_${formattedName}.png`);
        return `/assets/Buffet_${formattedName}.png`;
      } else {
        return `/assets/Drinks.png`;
      }
    };
  }, []);

  const translateCategory = (category) => {
    const translations = {
      Appetizer: "Khai vị",
      Main: "Món chính",
      Dessert: "Tráng miệng",
    };
    return translations[category] || category;
  };

  const handleToggleExpand = (setId) => {
    setExpandedSet(expandedSet === setId ? null : setId);
  };

  const sortDishes = (dishes) => {
    const categoryPriority = {
      Appetizer: 1,
      Main: 2,
      Dessert: 3,
    };
    return [...dishes].sort((a, b) => {
      const priorityA = categoryPriority[a.Category] || 999;
      const priorityB = categoryPriority[b.Category] || 999;
      return priorityA - priorityB;
    });
  };

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <div className="section-title">
          {icon && <span className="section-icon">{icon}</span>}
          <h2 className="text-lg font-medium text-gray-900">Menu</h2>
        </div>
        <button onClick={fetchData} className="refresh-button">
          Làm mới Menu
        </button>
      </div>

      <div className="section-content">
        {loading ? (
          <div className="loading-container">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : error ? (
          <div className="error-alert">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{error}</span>
          </div>
        ) : menuData.length === 0 ? (
          <div className="empty-state">
            <p>Không tìm thấy mục menu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuData.map((set) => (
              <div
                key={set.id}
                className="dashboard-card card-gradient-indigo"
              >
                <div
                  className="card-content cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleToggleExpand(set.id)}
                >
                  <div className="card-info">
                    <h3 className="text-lg font-semibold text-gray-800">{set.Name}</h3>
                    <p className="text-sm text-gray-500">ID Set: {set.id}</p>
                    <p className="text-sm text-gray-500">
                      {set.Dishes
                        ? `${set.Dishes.length} món`
                        : "Không có món nào"}
                    </p>
                  </div>
                  <div className="w-24 h-24 overflow-hidden rounded-lg">
                    <img
                      src={getImagePath(set.Name) || "/assets/default_set.png"}
                      alt={set.Name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log(`Tải ảnh thất bại: ${e.target.src}`);
                        e.target.onerror = null;
                        e.target.src = "/assets/default_set.png";
                      }}
                    />
                  </div>
                </div>
                {expandedSet === set.id && set.Dishes && set.Dishes.length > 0 && (
                  <div className="dishes-list p-4 bg-gray-50 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">
                      Danh sách món ăn
                    </h4>
                    <div className="space-y-3">
                      {sortDishes(set.Dishes).map((dish, index) => (
                        <div
                          key={index}
                          className="dish-item flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {dish.Name}
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              dish.Category === "Appetizer"
                                ? "bg-green-100 text-green-800"
                                : dish.Category === "Main"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-pink-100 text-pink-800"
                            }`}
                          >
                            {translateCategory(dish.Category)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuManager;