import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendanceReport = async () => {
      try {
        const response = await axios.get("https://backend-five-eta-21.vercel.app/attendance-report"); // Update with your backend URL
        if (response.data.success) {
          // Sort records by time in decreasing order (latest first)
          const sortedData = response.data.report.sort((a, b) => 
            new Date(b.attendanceTime) - new Date(a.attendanceTime)
          );
          setAttendanceData(sortedData);
        } else {
          setError("Failed to fetch attendance records.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceReport();
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "24px", textAlign: "center" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#2563eb", marginBottom: "16px" }}>
        📋 Attendance Report
      </h1>

      {loading ? (
        <p style={{ fontSize: "18px", fontWeight: "600", color: "#374151" }}>⏳ Loading attendance records...</p>
      ) : error ? (
        <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "10px", borderRadius: "8px", maxWidth: "400px", margin: "auto" }}>
          ❌ {error}
        </div>
      ) : (
        <div style={{ overflowX: "auto", maxWidth: "900px", margin: "auto", backgroundColor: "white", padding: "16px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "18px" }}>
            <thead>
              <tr style={{ backgroundColor: "#2563eb", color: "white", fontSize: "20px" }}>
                <th style={{ padding: "12px", border: "1px solid #d1d5db", width: "40%", textAlign: "left" }}>👤 Name</th>
                <th style={{ padding: "12px", border: "1px solid #d1d5db", width: "60%", textAlign: "left" }}>⏰ Attendance Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff", transition: "0.3s" }}>
                  <td style={{ padding: "12px", border: "1px solid #d1d5db", fontWeight: "500", color: "#374151" }}>
                    {record.name}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #d1d5db", color: "#6b7280" }}>
                    {record.attendanceTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;
