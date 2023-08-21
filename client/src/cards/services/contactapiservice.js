import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const sendFormData = async (formData) => {
    try {
      const response = await axios.post(`${apiUrl}/submit-form`, formData);
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      return false;
    }
  };