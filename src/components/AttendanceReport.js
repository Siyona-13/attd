import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendanceReport = async () => {
      try {
        const response = await axios.get("https://backend-five-eta-21.vercel.app/attendance-report"); // Change to your backend URL if deployed
        if (response.data.success) {
          setAttendanceData(response.data.report);
        } else {
          setError("Failed to fetch attendance records");
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">📋 Attendance Report</h1>

      {loading ? (
        <p className="text-lg">Loading attendance records...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Attendance Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{record.name}</td>
                  <td className="border px-4 py-2">{record.attendanceTime}</td>
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
