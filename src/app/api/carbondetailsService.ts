const API_URL = "http://localhost:3001/carbondetails";

export const updateCarbonDetails = async (formDataId: any,formData: any, token: any) => {
  if (formData.user) {
    delete formData.user;
  }
  try {
    const response = await fetch(`${API_URL}/update-details/${formDataId}`, {
      method: "PATCH",
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

export const getCarbonDetails = async (token: any) => {
  try {
    const response = await fetch(`${API_URL}/getAllDetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log("Hata: ", error);
  }
};

export const getOneCarbonDetails=async(token:any,formDataId:any)=>{
  try {
    const response=await fetch(`${API_URL}/getDetail/${formDataId}`,{
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log("Hata: ",error);
  }
}
