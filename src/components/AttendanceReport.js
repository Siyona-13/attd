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
          setAttendanceData(response.data.report);
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
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-6 py-3 text-lg">👤 Name</th>
                <th className="border px-6 py-3 text-lg">⏰ Attendance Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index} className="border hover:bg-gray-200 transition duration-200">
                  <td className="border px-6 py-3 text-center text-gray-800 font-medium">
                    {record.name}
                  </td>
                  <td className="border px-6 py-3 text-center text-gray-600">
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
