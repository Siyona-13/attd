import React, { useRef, useEffect } from "react";
import "./WebcamCapture.css";

const WebcamCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start webcam automatically when the component mounts
  useEffect(() => {
    const startWebcam = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    };

    startWebcam();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/jpeg");

    // Send captured image to parent component
    onCapture(imageDataUrl);
  };

  return (
    <div className="webcam-wrapper">
      <video className="webcam-feed" ref={videoRef} autoPlay />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button className="action-button" type="button" onClick={captureImage}>
        Mark Attendance
      </button>
    </div>
  );
};

export default WebcamCapture;
