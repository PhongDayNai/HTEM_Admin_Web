// "use client"

// import { useEffect, useState } from "react"
// import { Loader2, AlertCircle, CreditCard, Search, CheckCircle } from "lucide-react"
// import Modal from "react-modal"
// import "./Content.css"
// import DashboardSection from "./Dashboard/DashboardSection"

// // Bind modal to your app element for accessibility
// if (typeof window !== "undefined") {
//   Modal.setAppElement("#root")
// }

// const PaymentSection = () => {
//   const [payments, setPayments] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [modalIsOpen, setModalIsOpen] = useState(false)
//   const [selectedPayment, setSelectedPayment] = useState(null)
//   const [pointsToUse, setPointsToUse] = useState(0)

//   const fetchPayments = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/payments/all")
//       if (!response.ok) {
//         throw new Error("Failed to fetch payments")
//       }
//       const data = await response.json()
//       setPayments(data.payments || [])
//       setError(null)
//     } catch (err) {
//       console.error("Error fetching payments:", err)
//       setError("Failed to load payments. Please try again later.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchPayments()

//     // Set up interval to fetch data every second
//     const intervalId = setInterval(() => {
//       fetchPayments()
//     }, 1000)

//     // Clean up interval on component unmount
//     return () => clearInterval(intervalId)
//   }, [])

//   const handlePaymentClick = (payment) => {
//     if (payment.UserID !== -1) {
//       // Open modal for registered user
//       setSelectedPayment(payment)
//       setPointsToUse(0)
//       setModalIsOpen(true)
//     } else {
//       // Handle guest payment directly
//       handleGuestPayment(payment)
//     }
//   }

//   const handleGuestPayment = async (payment) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/payments/handleGuess", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           orderId: payment.OrderID,
//           amount: payment.TotalPrice,
//           paymentMethod: "cash",
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to process payment")
//       }

//       // Refresh payments after successful payment
//       fetchPayments()
//     } catch (err) {
//       console.error("Error processing guest payment:", err)
//       setError("Failed to process payment. Please try again.")
//     }
//   }

//   const handleUserPayment = async () => {
//     if (!selectedPayment) return

//     try {
//       // Calculate new amount after points deduction
//       const pointsValue = pointsToUse * 1000
//       const newAmount = Math.max(0, selectedPayment.TotalPrice - pointsValue)

//       const response = await fetch("http://localhost:8080/api/payments/handleUser", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: selectedPayment.UserID,
//           orderId: selectedPayment.OrderID,
//           usingPoints: pointsToUse > 0 ? 1 : 0,
//           pointsUsedNumber: pointsToUse,
//           amount: newAmount,
//           paymentMethod: "cash",
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to process payment")
//       }

//       // Close modal and refresh payments
//       setModalIsOpen(false)
//       fetchPayments()
//     } catch (err) {
//       console.error("Error processing user payment:", err)
//       setError("Failed to process payment. Please try again.")
//     }
//   }

//   // Format date to a more readable format
//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleString("vi-VN", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     }).format(amount)
//   }

//   // Filter payments based on search term
//   const filteredPayments = payments.filter(
//     (payment) =>
//       payment.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       payment.TableID?.toString().includes(searchTerm),
//   )

//   // Separate paid and unpaid payments
//   const unpaidPayments = filteredPayments.filter((payment) => !payment.PaymentID)
//   const paidPayments = filteredPayments.filter((payment) => payment.PaymentID)

//   // Custom styles for react-modal
//   const customModalStyles = {
//     content: {
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//       maxWidth: "500px",
//       width: "100%",
//       padding: "24px",
//       borderRadius: "8px",
//     },
//     overlay: {
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       zIndex: 1000,
//     },
//   }

//   return (
//     <div className="space-y-6">
//       <DashboardSection title="Quản lý thanh toán" icon={<CreditCard className="h-5 w-5" />}>
//         {error && (
//           <div className="error-alert">
//             <AlertCircle className="h-5 w-5" />
//             {error}
//           </div>
//         )}

//         <div className="order-search-container">
//           <Search className="order-search-icon h-4 w-4" />
//           <input
//             type="text"
//             placeholder="Tìm kiếm theo tên hoặc bàn..."
//             className="order-search-input"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {loading ? (
//           <div className="loading-container">
//             <Loader2 className="h-8 w-8 loading-spinner" />
//             <span className="ml-2 text-gray-600">Đang tải dữ liệu thanh toán...</span>
//           </div>
//         ) : (
//           <>
//             {/* Unpaid Payments Section */}
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Chưa thanh toán</h3>
//               {unpaidPayments.length === 0 ? (
//                 <div className="empty-state">
//                   <p>Không có đơn hàng chưa thanh toán.</p>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto w-full">
//                   <table className="orders-table">
//                     <thead>
//                       <tr>
//                         <th>Mã đơn</th>
//                         <th>Bàn</th>
//                         <th>Ngày đặt</th>
//                         <th>Khách hàng</th>
//                         <th>Thao tác</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {unpaidPayments.map((payment) => (
//                         <tr key={payment.OrderID}>
//                           <td>{payment.OrderID}</td>
//                           <td>{payment.TableID}</td>
//                           <td>{formatDate(payment.OrderDate)}</td>
//                           <td className="font-medium">{payment.UserID !== -1 ? payment.FullName : "Khách vãng lai"}</td>
//                           <td>
//                             <button onClick={() => handlePaymentClick(payment)} className="serve-button">
//                               <CheckCircle className="h-4 w-4 mr-1" />
//                               Thanh toán
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* Paid Payments Section */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Đã thanh toán</h3>
//               {paidPayments.length === 0 ? (
//                 <div className="empty-state">
//                   <p>Không có đơn hàng đã thanh toán.</p>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto w-full">
//                   <table className="orders-table">
//                     <thead>
//                       <tr>
//                         <th>Mã đơn</th>
//                         <th>Bàn</th>
//                         <th>Ngày đặt</th>
//                         <th>Khách hàng</th>
//                         <th>Tổng tiền</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paidPayments.map((payment) => (
//                         <tr key={payment.PaymentID || payment.OrderID}>
//                           <td>{payment.OrderID}</td>
//                           <td>{payment.TableID}</td>
//                           <td>{formatDate(payment.OrderDate)}</td>
//                           <td className="font-medium">{payment.UserID !== -1 ? payment.FullName : "Khách vãng lai"}</td>
//                           <td className="font-medium text-green-600">{formatCurrency(payment.TotalPrice)}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </DashboardSection>

//       {/* Points Modal using react-modal */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         style={customModalStyles}
//         contentLabel="Sử dụng điểm tích lũy"
//       >
//         {selectedPayment && (
//           <>
//             <h3 className="text-lg font-semibold mb-4">Sử dụng điểm tích lũy</h3>

//             <div className="mb-4">
//               <p className="text-sm text-gray-600 mb-1">Khách hàng: {selectedPayment.UserName}</p>
//               <p className="text-sm text-gray-600 mb-1">Điểm hiện có: {selectedPayment.Points} điểm</p>
//               <p className="text-sm text-gray-600 mb-3">
//                 Giá trị đơn hàng: {formatCurrency(selectedPayment.TotalPrice)}
//               </p>

//               <div className="mt-4">
//                 <label htmlFor="pointsInput" className="block text-sm font-medium text-gray-700 mb-1">
//                   Nhập số điểm muốn sử dụng:
//                 </label>
//                 <input
//                   id="pointsInput"
//                   type="number"
//                   min="0"
//                   max={Math.min(selectedPayment.Points, Math.floor(selectedPayment.TotalPrice / 1000))}
//                   value={pointsToUse}
//                   onChange={(e) => setPointsToUse(Number.parseInt(e.target.value) || 0)}
//                   className="form-input w-full"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   1 điểm = 1.000đ (Tối đa:{" "}
//                   {Math.min(selectedPayment.Points, Math.floor(selectedPayment.TotalPrice / 1000))} điểm)
//                 </p>
//               </div>

//               <div className="mt-4 p-3 bg-gray-50 rounded-md">
//                 <p className="text-sm font-medium">Tổng thanh toán sau khi sử dụng điểm:</p>
//                 <p className="text-lg font-bold text-green-600">
//                   {formatCurrency(Math.max(0, selectedPayment.TotalPrice - pointsToUse * 1000))}
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-end space-x-3 mt-6">
//               <button
//                 onClick={() => setModalIsOpen(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Hủy
//               </button>
//               <button
//                 onClick={handleUserPayment}
//                 className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700"
//               >
//                 Xác nhận thanh toán
//               </button>
//             </div>
//           </>
//         )}
//       </Modal>
//     </div>
//   )
// }

// export default PaymentSection


"use client"

import { useEffect, useState } from "react"
import { Loader2, AlertCircle, CreditCard, Search, CheckCircle } from "lucide-react"
import Modal from "react-modal"
import "./Content.css"
import DashboardSection from "./Dashboard/DashboardSection"

// Bind modal to your app element for accessibility
if (typeof window !== "undefined") {
  Modal.setAppElement("#root")
}

const PaymentSection = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [pointsToUse, setPointsToUse] = useState(0)

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/payments/all")
      if (!response.ok) {
        throw new Error("Failed to fetch payments")
      }
      const data = await response.json()
      setPayments(data.payments || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching payments:", err)
      setError("Failed to load payments. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()

    // Set up interval to fetch data every second
    const intervalId = setInterval(() => {
      fetchPayments()
    }, 1000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  function handlePaymentClick(payment) {
    if (payment.UserID !== -1) {
      // Open modal for registered user
      setSelectedPayment(payment)
      setPointsToUse(0) // Reset points to use
      setModalIsOpen(true)
    } else {
      // Handle guest payment directly
      handleGuestPayment(payment)
    }
  }

  const handleGuestPayment = async (payment) => {
    try {
      const response = await fetch("http://localhost:8080/api/payments/handleGuess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: payment.OrderID,
          amount: payment.TotalPrice,
          paymentMethod: "cash",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to process payment")
      }

      // Refresh payments after successful payment
      fetchPayments()
    } catch (err) {
      console.error("Error processing guest payment:", err)
      setError("Failed to process payment. Please try again.")
    }
  }

  const handleUserPayment = async () => {
    if (!selectedPayment) return

    try {
      // Calculate new amount after points deduction
      const pointsValue = pointsToUse * 1000
      const newAmount = Math.max(0, selectedPayment.TotalPrice - pointsValue)

      const response = await fetch("http://localhost:8080/api/payments/handleUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedPayment.UserID,
          orderId: selectedPayment.OrderID,
          usingPoints: pointsToUse > 0 ? 1 : 0,
          pointsUsedNumber: pointsToUse,
          amount: newAmount,
          paymentMethod: "cash",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to process payment")
      }

      // Close modal and refresh payments
      setModalIsOpen(false)
      fetchPayments()
    } catch (err) {
      console.error("Error processing user payment:", err)
      setError("Failed to process payment. Please try again.")
    }
  }

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  // Filter payments based on search term
  const filteredPayments = payments.filter(
    (payment) =>
      payment.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.TableID?.toString().includes(searchTerm),
  )

  // Separate paid and unpaid payments
  const unpaidPayments = filteredPayments.filter((payment) => !payment.PaymentID)
  const paidPayments = filteredPayments.filter((payment) => payment.PaymentID)

  // Custom styles for react-modal
  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "500px",
      width: "100%",
      padding: "24px",
      borderRadius: "8px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  }

  return (
    <div className="space-y-6">
      <DashboardSection title="Quản lý thanh toán" icon={<CreditCard className="h-5 w-5" />}>
        {error && (
          <div className="error-alert">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <div className="order-search-container">
          <Search className="order-search-icon h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc bàn..."
            className="order-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <Loader2 className="h-8 w-8 loading-spinner" />
            <span className="ml-2 text-gray-600">Đang tải dữ liệu thanh toán...</span>
          </div>
        ) : (
          <>
            {/* Unpaid Payments Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Chưa thanh toán</h3>
              {unpaidPayments.length === 0 ? (
                <div className="empty-state">
                  <p>Không có đơn hàng chưa thanh toán.</p>
                </div>
              ) : (
                <div className="overflow-x-auto w-full">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Mã đơn</th>
                        <th>Bàn</th>
                        <th>Ngày đặt</th>
                        <th>Khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unpaidPayments.map((payment) => (
                        <tr key={payment.OrderID}>
                          <td>{payment.OrderID}</td>
                          <td>{payment.TableID}</td>
                          <td>{formatDate(payment.OrderDate)}</td>
                          <td className="font-medium">{payment.UserID !== -1 ? payment.FullName : "Khách vãng lai"}</td>
                          <td className="font-medium text-green-600">{formatCurrency(payment.TotalPrice)}</td>
                          <td>
                            <button onClick={() => handlePaymentClick(payment)} className="serve-button">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Thanh toán
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Paid Payments Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Đã thanh toán</h3>
              {paidPayments.length === 0 ? (
                <div className="empty-state">
                  <p>Không có đơn hàng đã thanh toán.</p>
                </div>
              ) : (
                <div className="overflow-x-auto w-full">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Mã đơn</th>
                        <th>Bàn</th>
                        <th>Ngày đặt</th>
                        <th>Khách hàng</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paidPayments.map((payment) => (
                        <tr key={payment.PaymentID || payment.OrderID}>
                          <td>{payment.OrderID}</td>
                          <td>{payment.TableID}</td>
                          <td>{formatDate(payment.OrderDate)}</td>
                          <td className="font-medium">{payment.UserID !== -1 ? payment.FullName : "Khách vãng lai"}</td>
                          <td className="font-medium text-green-600">{formatCurrency(payment.TotalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </DashboardSection>

      {/* Points Modal using react-modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customModalStyles}
        contentLabel="Sử dụng điểm tích lũy"
      >
        {selectedPayment && (
          <>
            <h3 className="text-lg font-semibold mb-4">Sử dụng điểm tích lũy</h3>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Khách hàng: {selectedPayment.FullName}</p>
              <p className="text-sm text-gray-600 mb-1">Điểm hiện có: {selectedPayment.Points || 0} điểm</p>
              <p className="text-sm text-gray-600 mb-3">
                Giá trị đơn hàng: {formatCurrency(selectedPayment.TotalPrice)}
              </p>

              <div className="mt-4">
                <label htmlFor="pointsInput" className="block text-sm font-medium text-gray-700 mb-1">
                  Nhập số điểm muốn sử dụng:
                </label>
                <input
                  id="pointsInput"
                  type="number"
                  min="0"
                  max={Math.min(selectedPayment.Points || 0, Math.floor(selectedPayment.TotalPrice / 1000))}
                  value={pointsToUse}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value) || 0
                    const maxPoints = Math.min(
                      selectedPayment.Points || 0,
                      Math.floor(selectedPayment.TotalPrice / 1000),
                    )
                    setPointsToUse(Math.min(value, maxPoints))
                  }}
                  className="form-input w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  1 điểm = 1.000đ (Tối đa:{" "}
                  {Math.min(selectedPayment.Points || 0, Math.floor(selectedPayment.TotalPrice / 1000))} điểm)
                </p>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium">Tổng thanh toán sau khi sử dụng điểm:</p>
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(Math.max(0, selectedPayment.TotalPrice - pointsToUse * 1000))}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setModalIsOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleUserPayment}
                className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700"
              >
                Xác nhận thanh toán
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}

export default PaymentSection
