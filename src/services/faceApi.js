import axios from "axios";

const apiKey = "9S4aT4xdloXBTO0b38yHPOZBAq-5t9mA";
const apiSecret = "HNt1jnHG2X2JgDbo35jTR4CxSejWkg9W";

const apiBaseUrl = "http://localhost:5000";

// Add face to the FaceSet
export const addFaceToFaceSet = async (name, imageBase64) => {
  const detectResponse = await axios.post(`${apiBaseUrl}/detect`, null, {
    params: {
      api_key: apiKey,
      api_secret: apiSecret,
      image_base64: imageBase64,
    },
  });

  const faceToken = detectResponse.data.faces[0].face_token;

  const addResponse = await axios.post(`${apiBaseUrl}/faceset/addface`, null, {
    params: {
      api_key: apiKey,
      api_secret: apiSecret,
      faceset_token: "877fe817a455daa20b870600ae2708b5", // Replace with your actual FaceSet token
      face_tokens: faceToken,
    },
  });

  return addResponse.data;
};
