import { useRef } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const inputRefs = useRef([]);
  const {backendUrl,token,userData,loadUserProfileData} = useContext(AppContext);
  const navigate = useNavigate();

  
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };


  const onSubmitHandler = async (e)=>{
     try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e=>e.value);
      const otp = otpArray.join('');
      const {data} = await axios.post(backendUrl+'/api/user/verify-account',{otp},{headers:{token}});
      if(data.success){
         toast.success(data.message);
         await loadUserProfileData();
         navigate('/')
      }
      else{
        toast.error(data.message);
      }
      
     } catch (error) {
       toast.error(error.message)
      
     }
  }

 useEffect(() => {
  if (token && userData?.isAccountVerified) {
    navigate('/');
  }
}, [token, userData?.isAccountVerified]);

  
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Email Verify OTP</p>
        <p>Enter the 6-digit code sent to your email id.</p>

        <div className="flex justify-between w-full mb-4" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 border border-zinc-300 rounded text-center text-lg"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Verify Email
        </button>
      </div>
    </form>
  );
};

export default EmailVerify;
