import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFacePage from "./pages/AddFacePage"; // Adjust the path if necessary
import MarkAttendancePage from "./pages/MarkAttendancePage"; // Adjust the path if necessary

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="flex justify-between mb-4">
          <Link to="/" className="text-blue-500">Mark Attendance</Link>
          <Link to="/attendance-report" className="text-blue-500">View Attendance Report</Link>
        </nav>
      <Routes>
        {/* Mark Attendance is now the default route */}
        <Route path="/" element={<MarkAttendancePage />} />

        {/* Add Face moved to /add-face */}
        <Route path="/add-face" element={<AddFacePage />} />
        <Route path="/attendance-report" element={<AttendanceReport />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
