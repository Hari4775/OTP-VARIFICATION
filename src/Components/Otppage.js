import React, { useState, useEffect } from 'react';
import OTPInput from "otp-input-react";   /*  npm i otp-input-react*/
import { Button } from 'react-bootstrap'; /* npm i react-bootstrap*/

const Otppage = () => {
    const [OTP, setOTP] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [mailid, setMailid] = useState("h****0.com");

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    const sendOTP = () => {
        setMinutes(2);
        setSeconds(30);
    };

    const resendOTP = () => {
        setMinutes(2);
        setSeconds(59);
    };

    return (
        <div className='container-fluid' style={{ width: "600px", height: "100%" }}>
            <div className='container' style={{ backgroundColor: 'beige' }}>
                <div className='row mt-5'>
                    <h1 style={{ color: "darkblue", fontSize: "50px", fontWeight: "bolder", fontFamily: "revert-layer" }}>OTP VERIFICATION</h1>
                </div>
                <div className='mt-3 mb-5 row'>
                    <h6>Enter the verification code received in your Mail {mailid}</h6>
                </div>

                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-3'>
                        <p>Verification code</p>
                    </div>
                    <div className='col-1'></div>
                    <div className='col-1'>
                        {seconds > 0 || minutes > 0 ? (
                            <p style={{ color: "red" }}>
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </p>
                        ) : (
                            <p></p>
                        )}
                    </div>
                    <div className='col-2'></div>
                    <div className='col-3'>
                        <h5 className='text-primary'
                            disabled={seconds > 0 || minutes > 0}
                            style={{
                                cursor: seconds > 0 || minutes > 0 ? "not-allowed" : "pointer",
                                color: seconds > 0 || minutes > 0 ? "#region" : "#FF5630"
                            }}
                            onClick={resendOTP}
                        >
                            Resend OTP
                        </h5>
                    </div>
                    <div className='col-1'></div>
                </div>

                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10 '>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: "20px", width: "100%", alignItems: "center" }}>
                            <OTPInput
                                inputStyle="inputStyle"
                                value={OTP}
                                onChange={(otpValue) => {
                                    setOTP(otpValue);
                                }}
                                autoFocus
                                OTPLength={5}
                                otpType="number"
                                disabled={false}
                            />
                        </div>

                        <div className='row mt-5 mb-5'>
                            <div className='col-12'>
                                <Button className='bg-success btn w-50' onClick={sendOTP}>VERIFY</Button>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-7'>
                                <h6>Having Problems? <span style={{ color: 'blue', cursor: 'pointer' }} href="#">Know More</span></h6>
                            </div>
                            <div className='col-5'>
                            </div>
                        </div>
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
        </div>
    )
}

export default Otppage;
