import React from "react";
import AttendanceReport from "../components/AttendanceReport"; // Import the component

const AttendanceReportPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Attendance Report</h1>
      
      {/* Render Attendance Report Component */}
      <AttendanceReport />
    </div>
  );
};

export default AttendanceReportPage;
