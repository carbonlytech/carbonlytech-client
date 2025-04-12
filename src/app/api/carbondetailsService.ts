const API_URL="http://localhost:3001/carbondetails"

export const sendCarbonDetails = async (formData: any, token: any) => {
    try {
      const response = await fetch(`${API_URL}/send-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  