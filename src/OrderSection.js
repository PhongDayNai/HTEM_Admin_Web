"use client"

import { useEffect, useState } from "react"
import {
  Loader2,
  CheckCircle,
  PlusCircle,
  AlertCircle,
  ShoppingBag,
  Search,
} from "lucide-react"
import "./Content.css"
import DashboardSection from "./Dashboard/DashboardSection"

const OrdersManagement = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [servedQuantities, setServedQuantities] = useState({})
    const [newOrderName, setNewOrderName] = useState("")
    
    const loadOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/orders/serving', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Orders:', data);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const served = async (orderId, dishId, quantity) => {
        try {
            const response = await fetch('http://localhost:8080/api/orders/served', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId,
                    dishId,
                    quantity
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update served status');
            }
            setLoading(true);
            await loadOrders();
            servedQuantities = '';
    
            alert(`Dish ${dishId} in Order ${orderId} has been marked as served!`);
        } catch (error) {
            console.error('Error updating served status:', error);
            // alert('Failed to mark dish as served. Please try again.');
        }
    };

    const handleQuantityChange = (orderId, dishId, value) => {
        setServedQuantities((prev) => ({
            ...prev,
            [`${orderId}-${dishId}`]: value,
        }));
    };

    // useEffect(() => {
    //     loadOrders()
    // }, [])

    const addOrder = () => {
        alert(`Adding order: ${newOrderName}`)
        setNewOrderName("")
    }

    useEffect(() => {
        loadOrders()
    
        const intervalId = setInterval(() => {
          loadOrders()
        }, 2000)
    
        return () => clearInterval(intervalId)
    }, []);

    return (
        <div className="space-y-6">
        <DashboardSection title="Quản lý đặt hàng" icon={<ShoppingBag className="h-5 w-5" />}>
            {error && (
            <div className="error-alert">
                <AlertCircle className="h-5 w-5" />
                {error}
            </div>
            )}

            <div className="order-search-container">
            <Search className="order-search-icon h-4 w-4" />
            <input type="text" placeholder="Tìm kiếm theo bàn hoặc ăn..." className="order-search-input" />
            <button 
                onClick={() => { 
                    setLoading(true);
                    loadOrders();
                }} 
                className="refresh-button"
            >
            Làm mới
            </button>
            </div>

            {loading ? (
            <div className="loading-container">
                <Loader2 className="h-8 w-8 loading-spinner" />
                <span className="ml-2 text-gray-600">Loading orders...</span>
            </div>
            ) : (
            <>
                {orders.length === 0 ? (
                <div className="empty-state">
                    <p>Không có món đang chờ phục vụ.</p>
                    {/* <button 
                        onClick={() => {
                            setLoading(true);
                            loadOrders();
                        }} 
                        className="refresh-button"
                    >
                    Làm mới
                    </button> */}
                </div>
                ) : (
                <div className="overflow-x-auto w-full">
                    <table className="orders-table">
                    <thead>
                        <tr>
                        <th>Mã bàn</th>
                        <th>Tên món</th>
                        <th>Số lượng còn lại</th>
                        <th>Nhập số lượng</th>
                        <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.TableID}</td>
                            <td className="font-medium">{order.DishName}</td>
                            <td>
                            <span className="quantity-badge">{order.RemainingQuantity}</span>
                            </td>
                            <td>
                            <input
                                type="number"
                                min="1"
                                max={order.RemainingQuantity}
                                value={servedQuantities[`${order.OrderID}-${order.DishID}`] || ""}
                                onChange={(e) => handleQuantityChange(order.OrderID, order.DishID, e.target.value)}
                                placeholder="Qty"
                                className="quantity-input"
                            />
                            </td>
                            <td>
                            <button
                                onClick={() =>
                                served(
                                    order.OrderID,
                                    order.DishID,
                                    Number.parseInt(servedQuantities[`${order.OrderID}-${order.DishID}`] || 0, 10),
                                )
                                }
                                disabled={
                                !servedQuantities[`${order.OrderID}-${order.DishID}`] ||
                                servedQuantities[`${order.OrderID}-${order.DishID}`] > order.RemainingQuantity
                                }
                                className="serve-button"
                            >
                                <CheckCircle className="h-4 w-4" />
                                Cập nhật
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                )}
            </>
            )}
        </DashboardSection>

        <DashboardSection title="Thêm đơn mới" icon={<PlusCircle className="h-5 w-5" />}>
            <div className="add-order-form">
            <div className="form-group">
                <label htmlFor="orderName" className="form-label">
                Tên món ăn
                </label>
                <input
                id="orderName"
                type="text"
                value={newOrderName}
                onChange={(e) => setNewOrderName(e.target.value)}
                placeholder="Nhập tên món ăn"
                className="form-input"
                />
            </div>
            <button onClick={addOrder} className="add-button">
                <PlusCircle className="h-4 w-4" />
                Thêm món ăn
            </button>
            </div>
        </DashboardSection>
        </div>
    )
}

export default OrdersManagement;