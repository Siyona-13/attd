import React, { useState } from "react";
import WebcamCapture from "../components/WebcamCapture";
import axios from "axios";
import "./MarkAttendancePage.css";

const MarkAttendancePage = () => {
  const [message, setMessage] = useState("");

  const handleCapture = async (imageSrc) => {
    try {
      const base64Image = imageSrc.split(",")[1];

      const response = await axios.post("https://backend-psi-three-99.vercel.app/", {
        photo: base64Image,
      });

      if (response.data.success) {
        const name = response.data.name;
        const attendanceTime = response.data.attendanceTime;

        setMessage(`Attendance marked successfully for ${name} at ${attendanceTime}`);
      } else {
        setMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error marking attendance:", error.message || error);
      setMessage("An error occurred while marking attendance.");
    }
  };

  return (
    <div className="attendance-page">
      <h1 className="title">Mark Attendance</h1>
      <WebcamCapture onCapture={handleCapture} />
      <p className="message">{message}</p>
      
      {/* Hyperlink to Add Face Page */}
      <a href="/add-face" target="" className="link">
        Add Face
      </a>
    </div>
  );
};

export default MarkAttendancePage;
