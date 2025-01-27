import React, { useEffect, useState } from "react";

const AttendanceReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch("/attendance-report"); // Vercel backend endpoint
        const data = await response.json();
        if (data.success) {
          setReport(data.report);
        } else {
          console.error("Failed to fetch attendance report:", data.error);
        }
      } catch (error) {
        console.error("Error fetching attendance report:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Attendance Report</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Face Token</th>
              <th className="border border-gray-300 px-4 py-2">Attendance Time</th>
            </tr>
          </thead>
          <tbody>
            {report.map((record, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{record.name}</td>
                <td className="border border-gray-300 px-4 py-2">{record.faceToken}</td>
                <td className="border border-gray-300 px-4 py-2">{record.attendanceTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceReport;
