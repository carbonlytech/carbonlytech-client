const API_URL="http://localhost:3001/auth"

export const signUpUser=async(userData: any,router:any,setSuccess: any,setErrors: any)=>{
    setErrors([]);

    try {
        const response=await fetch(`${API_URL}/signup`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(userData),
        })

        if(!response.ok){
            const data=await response.json();
            const errorMessages=Array.isArray(data.message)
                ? data.message
                : [data.message];
            setErrors(errorMessages); 
        }else{
            const data=await response.json();
            localStorage.setItem("token",data.token);
            setSuccess("Signup successfully");
            setTimeout(()=>{
                router.push("/user/signin")
            },2000)
        }
    } catch (error) {
        console.error(error);
        setErrors(["An unexpected error occurred. Please try again later."]);
    }
}

export const signInUser=async(userData: any,router:any,setSuccess: any,setErrors: any)=>{
    setErrors([]);

    try {
        const response=await fetch(`${API_URL}/login`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(userData),
        });

        if(!response.ok){
            const data=await response.json();
            const errorMessages = Array.isArray(data.message)
              ? data.message
              : [data.message];
            setErrors(errorMessages);
        }else{
            const data=await response.json();
            localStorage.setItem("token",data.token);
            setSuccess("Signed in successfully");
            setTimeout(()=>{
                router.push("/details")
            },2000);
        }
    } catch (error) {
        console.error(error);
        setErrors(["An unexpected error occurred. Please try again later."]);
    }
}
