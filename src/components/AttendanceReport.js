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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">📋 Attendance Report</h1>

      {loading ? (
        <p className="text-lg text-gray-700 font-semibold">⏳ Loading attendance records...</p>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md max-w-lg">
          ❌ {error}
        </div>
      ) : (
        <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
          <table className="table-fixed w-full border border-gray-500">
            <thead>
              <tr className="bg-blue-500 text-white text-lg">
                <th className="border border-gray-600 px-8 py-4 w-1/3 text-left">👤 Name</th>
                <th className="border border-gray-600 px-8 py-4 w-2/3 text-left">⏰ Attendance Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index} className="border border-gray-400 hover:bg-gray-200 transition duration-200">
                  <td className="border border-gray-400 px-8 py-4 text-gray-800 font-medium">{record.name}</td>
                  <td className="border border-gray-400 px-8 py-4 text-gray-600">{record.attendanceTime}</td>
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
