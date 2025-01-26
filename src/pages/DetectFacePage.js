import React, { useState } from "react";
import MarkAttendance from "../components/MarkAttendance";
import axios from "axios";

const DetectFacePage = () => {
  const [message, setMessage] = useState("");

  const handleSearch = async (capturedImage) => {
    try {
      // Call the backend to search for the face
      const response = await axios.post("http://localhost:5000/search-face", {
        photo: capturedImage,
      });

      const results = response.data.data.results || [];
      if (results.length > 0) {
        // If a match is found, display the user ID (or name) and mark attendance
        const userId = results[0].user_id || "Unknown";
        setMessage(`Attendance marked for: ${userId} at ${new Date().toLocaleString()}`);
      } else {
        setMessage("No match found! Please ensure you are registered.");
      }
    } catch (error) {
      // Handle errors and display appropriate messages
      setMessage(`Error detecting face: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Mark Attendance</h1>
      <MarkAttendance onSearch={handleSearch} />
      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold", color: "green" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default DetectFacePage;
