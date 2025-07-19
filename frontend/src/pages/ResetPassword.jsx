import  { useState, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSend] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otp,setOtp] = useState(0);
  const inputRefs = useRef([]);

  const {backendUrl} = useContext(AppContext);


  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').slice(0, 6);
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async(e)=>{
    e.preventDefault();

    try {
      const {data} = await axios.post(backendUrl+'/api/user/send-reset-otp',{email});
      data.success?toast.success(data.message):toast.error(data.message);
      data.success && setIsEmailSend(true);
      
    } catch (error) {
       toast.error(error.message);
    }
  }






  return (
    <div>
      {/* --- Email Input Form --- */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="min-h-[80vh] flex items-center">
          <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg">
            <p className="text-2xl font-semibold">Reset Password</p>
            <p>Enter your registered email address</p>

            <div className="w-full">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email id"
                required
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md text-base"
              onClick={(e) => {
                e.preventDefault();
                setIsEmailSend(true);
              }}
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {/* --- OTP Input Form --- */}
      {!isOtpSubmitted && isEmailSent && (
        <form className="min-h-[80vh] flex items-center">
          <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg">
            <p className="text-2xl font-semibold">Reset Password OTP</p>
            <p>Enter the 6-digit code sent to your email id.</p>

            <div
              className="flex justify-between w-full mb-4"
              onPaste={handlePaste}
            >
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
              onClick={(e) => {
                e.preventDefault();
                setIsOtpSubmitted(true);
              }}
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {/* --- New Password Form --- */}
      {isOtpSubmitted && isEmailSent && (
        <form className="min-h-[80vh] flex items-center">
          <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg">
            <p className="text-2xl font-semibold">New Password</p>
            <p>Enter the new password below</p>

            <div className="w-full">
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md text-base"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
