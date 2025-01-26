import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFacePage from "./pages/AddFacePage"; // Adjust the path if necessary
import MarkAttendancePage from "./pages/MarkAttendancePage"; // Adjust the path if necessary

function App() {
  return (
    <Router>
      <Routes>
        {/* Mark Attendance is now the default route */}
        <Route path="/" element={<MarkAttendancePage />} />

        {/* Add Face moved to /add-face */}
        <Route path="/add-face" element={<AddFacePage />} />
      </Routes>
    </Router>
  );
}

export default App;
