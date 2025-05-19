"use client"

import { useState, useEffect } from "react"
import "./CallStaffNotification.css"

const CallStaffNotification = () => {
  const [callStaffs, setCallStaffs] = useState([])
  const [isVisible, setIsVisible] = useState(true)

  const fetchCallStaffs = async () => {
    try {
      console.log("Đang gọi API get-call-staffs...")

      const response = await fetch("http://localhost:8080/api/users/get-call-staffs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const data = await response.json()
        console.log("Dữ liệu nhận được:", data)
        setCallStaffs(data)
      } else {
        console.error("Lỗi khi lấy dữ liệu:", response.statusText)
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error)
    }
  }

  const updateCallStaff = async (callStaffId) => {
    try {
      console.log("Đang cập nhật callStaffId:", callStaffId)

      setCallStaffs(callStaffs.filter((staff) => staff.CallStaffID !== callStaffId))

      const response = await fetch("http://localhost:8080/api/users/update-call-staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ callStaffId: callStaffId }),
      })

      if (!response.ok) {
        console.error("Lỗi khi cập nhật:", response.statusText)
        fetchCallStaffs()
      }
    } catch (error) {
      console.error("Lỗi khi gọi API cập nhật:", error)
      fetchCallStaffs()
    }
  }

  useEffect(() => {
    console.log("Component đã mount, gọi API lần đầu")
    fetchCallStaffs()

    const intervalId = setInterval(() => {
      console.log("Đang gọi API định kỳ...")
      fetchCallStaffs()
    }, 500)

    return () => {
      console.log("Component unmount, xóa interval")
      clearInterval(intervalId)
    }
  }, [])

  console.log("Rendering component với", callStaffs.length, "thông báo")
  console.log("isVisible:", isVisible)

  if (callStaffs.length === 0) {
    console.log("Không có thông báo, không hiển thị gì")
    return null
  }

  return (
    <>
      {isVisible ? (
        <div className="call-staff-notification" style={{ display: "block" }}>
          <div className="notification-header">
            <h3>Thông báo gọi nhân viên ({callStaffs.length})</h3>
            <button className="close-button" onClick={() => setIsVisible(false)}>
              ×
            </button>
          </div>
          <div className="notification-content">
            {callStaffs.map((staff) => (
              <div key={staff.CallStaffID} className="notification-item">
                <div className="notification-info">
                  <p>
                    <strong>Bàn:</strong> {staff.TableID}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong> {staff.Status}
                  </p>
                  <p>
                    <strong>Thời gian:</strong> {new Date(staff.CreatedAt).toLocaleTimeString()}
                  </p>
                </div>
                <button className="complete-button" onClick={() => updateCallStaff(staff.CallStaffID)}>
                  Đã xử lý
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="notification-toggle-button" onClick={() => setIsVisible(true)}>
          <span className="bell-icon">🔔</span>
          {callStaffs.length > 0 && <span className="notification-badge">{callStaffs.length}</span>}
        </div>
      )}
    </>
  )
}

export default CallStaffNotification
