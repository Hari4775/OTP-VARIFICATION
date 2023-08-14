import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';

const Otp = () => {

    const [otp, setOtp] = useState('');
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [remainingTime, setRemainingTime] = useState(60);
  
    useEffect(() => {
      let timer;
      if (isTimerActive && remainingTime > 0) {
        timer = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
      } else if (remainingTime === 0) {
        setIsTimerActive(false);
      }

      return () => {
        clearInterval(timer);
      };
    }, [isTimerActive, remainingTime]);
  
    const handleResendClick = () => {
      if (!isTimerActive) {
        setIsTimerActive(true);
        setRemainingTime(60);
        // Add logic to resend OTP here
      }
    };

  return (
    <div>
     <div className="otp-verification">
      <h1>OTP Verification</h1>
      <p>Enter the 5-digit OTP sent to your mobile number</p>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        separator={<span>-</span>}
        isInputNum
        disabled={!isTimerActive}
      />
      {isTimerActive ? (
        <p>Resend OTP in {remainingTime} seconds</p>
      ) : (
        <button onClick={handleResendClick}>Resend OTP</button>
      )}
      <button disabled={otp.length !== 5}>Verify</button>
    </div>
      
    </div>
  )
}

export default Otp
