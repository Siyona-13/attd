import React, { useRef, useState } from "react";

const MarkAttendance = ({ onSearch }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const startWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageDataUrl);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!capturedImage) {
      alert("Please capture an image first.");
      return;
    }
    onSearch(capturedImage);
  };

  return (
    <form onSubmit={handleSearch}>
      <div>
        <button type="button" onClick={startWebcam}>
          Start Webcam
        </button>
        <video ref={videoRef} autoPlay style={{ width: "300px", marginTop: "10px" }} />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <button type="button" onClick={captureImage} style={{ marginTop: "10px" }}>
          Capture Image
        </button>
      </div>

      {capturedImage && (
        <div>
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured" style={{ width: "300px" }} />
        </div>
      )}

      <button type="submit" style={{ marginTop: "20px" }}>
        Mark Attendance
      </button>
    </form>
  );
};

export default MarkAttendance;
