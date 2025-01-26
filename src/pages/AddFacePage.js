import React, { useState } from "react";
import WebcamCapture from "../components/WebcamCapture__foraddface";
import axios from "axios";
import "./AddFacePage.css";

const AddFacePage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleCapture = async (imageSrc) => {
    try {
      if (!name) {
        setMessage("Name is required!");
        return;
      }

      const base64Image = imageSrc.split(",")[1];
      //eslint-disable-next-line
      const response = await axios.post("http://localhost:5000/add-face", {
        name,
        photo: base64Image,
      });

      setMessage(`Congratulations! ${name}, your face has been added.`);
    } catch (error) {
      console.error("Error adding face:", error);
      setMessage(`Error: ${error.response.data.error || error.message}`);
    }
  };

  return (
    <div className="add-face-page">
      <h1 className="title">Add a Face</h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="name-input"
      />
      <WebcamCapture onCapture={handleCapture} />
      <p className="message">{message}</p>
      
      {/* Hyperlink to Mark Attendance Page */}
      <a href="/" target="" className="link">
        Mark Attendance
      </a>
    </div>
  );
};

export default AddFacePage;
