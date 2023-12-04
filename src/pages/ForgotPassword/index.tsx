import { Fragment, useRef, useState } from "react";
import FormInput from "../../base-components/Form/FormInput";
import Button from "../../base-components/Button";
import { DEVICE_TYPE } from "../../utils/constants";
import { handlePostRequest } from "../../utils/http";
import ShowAlert from "../../commonComponents/ShowAlert";
import { isPasswordValid } from "../../utils/common";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import arrowUrl from '../../assets/images/login-signup/forward-arrow.svg'
import { FormLabel } from "../../base-components/Form";
import LoginSignupWrapper from "../../components/LoginSignupWrapper";
import showPasswordUrl from '../../assets/images/login-signup/show-password.png'

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("")
  const [failureMessage, setFailureMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPasswordPage, setNewPasswordPage] = useState(true);

  const togglePasswordShow = () => {
    setShowPassword((val) => !val);
  }
  const toggleConfirmPasswordShow = () => {
    setShowConfirmPassword((val) => !val);
  }

  const handlePhoneChange = (event: any) => {
    setPhoneNumber(event.target.value)
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }

  const handlePasswordVerifyChange = (event: any) => {
    setPasswordVerify(event.target.value)
  }

  const handleCountryCodeChange = (event: any) => {
    setCountryCode(event.target.value)
  }


  const handleVerifyOtp = async () => {
    if (!(otp && otp.length === 6)) {
      setFailureMessage("Please enter the 6 digit OTP");
      setShowFailureAlert(true);
      return;
    }
    setNewPasswordPage((val) => !val)
  }
  const handleForgetPassword = async () => {

    if (password !== passwordVerify) {
      setFailureMessage("Passwords didn't match");
      setShowFailureAlert(true);
      return;
    }
    const passwordValid = await isPasswordValid(password);
    if (!passwordValid) {
      setFailureMessage("Invalid password. The passowrd must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, one special character.");
      setShowFailureAlert(true);
      return;
    }
    const forgotPasswordBody = {
      "country_code": countryCode,
      "phone": phoneNumber,
      "verification_otp": otp,
      "new_password": password
    }
    const resp = await handlePostRequest("/user/reset-password", forgotPasswordBody);
    if (resp.code >= 200 && resp.code < 300) {
      setSuccessMessage("Password changed successfully");
      setShowSuccessAlert(true);
      navigate("/login")
    } else {
      setFailureMessage("Invalid OTP");
      setShowFailureAlert(true);
    }
  }

  const handleSuccessAlertDismissal = () => {
    setSuccessMessage("");
    setShowSuccessAlert(false);
  }

  const handleFailureAlertDismissal = () => {
    setFailureMessage("");
    setShowFailureAlert(false);
  }

  const handleSubmitPhone = async () => {

    // ** change it 
    setOtpSent(true);

    if (!(countryCode && countryCode.length === 3)) {
      setFailureMessage("Please enter a valid country code.");
      setShowFailureAlert(true);
      return;
    }
    if (!(phoneNumber && phoneNumber.length === 10)) {
      setFailureMessage("Please enter a valid phone number.");
      setShowFailureAlert(true);
      return;
    }
    const sendOtpRequestBody = {
      "country_code": countryCode,
      "phone": phoneNumber,
      "timezone": "5.5", // Get the timezone automatically using Date
      "app_version": "1.1",
      "device_type": DEVICE_TYPE.WEB,
      "device_token": "device_token"
    }

    const resp = await handlePostRequest("/user/forgot-password", sendOtpRequestBody);
    if (resp.code >= 200 && resp.code < 300) {
      setOtpSent(true);
      setSuccessMessage("We have sent an OTP to your phone. Please use that to reset your password.");
      setShowSuccessAlert(true);
    } else {
      setFailureMessage("Something went wrong. Please contact the site admin at contact@tcipher.com");
      setShowFailureAlert(true);
    }
  }

  const handleOptChange = (e: any, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) && index >= 0 && index < 6) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5 && value !== '' && inputRefs[index + 1]?.current) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index >= 0) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (inputRefs[index - 1]?.current) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  return (
    <LoginSignupWrapper>
      <div className="
       px-[2.5rem]
       sm:px-[6rem]
       md:px-[12rem]
       lg:px-[5rem]
       pt-10
       pb-10
       gap-8
       overflow-y-auto
       flex
       flex-col
       justify-center
      h-screen
      w-full">
        <Logo />
        {otpSent ?
        //==== FORGOT PASSWORD SCREEN CONDITIONAL-RENDER WITH  [ VERIFY OTP || SET NEW PASSWORD SCREEN ] ====
          <div className="flex flex-col gap-8">
            {newPasswordPage ?
            // ===== VERIFY OTP SCREEN  ====
              <Fragment>
                <div>
                  <h1 className=" text-center sm:text-left text-3xl py-2">Verify your OTP</h1>
                  <span className="text-center sm:text-left text-slate-500 text-md
          font-light mb-4">
                    We’ve sent you a confirmation code on your phone number
                  </span>
                </div>
                <div className="flex flex-start justify-center lg:justify-start gap-4">
                  {otp.map((value, index) => (
                    <FormInput
                      key={index}
                      type="text"
                      maxLength={1}
                      className="block px-4 py-3 w-14"
                      value={value}
                      onChange={(e) => handleOptChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={inputRefs[index]}
                    />
                  ))}
                </div>
                <Button className="
       w-full
       text-sm
       sm:text-lg
       font-light
       py-3
       bg-[#04032D] 
       text-white 
       rounded-xl
       gap-2
       group
       "
                  onClick={handleVerifyOtp}
                >Verify
                  <img
                    className="
       scale-125
       group-hover:scale-150
       group-hover:translate-y-1
       group-hover:translate-x-1
       transition"
                    src={arrowUrl} alt="forward-arrow" />
                </Button>
              </Fragment>
              :
              // ==== SET NEW PASSWORD SCREEN  ====
              <Fragment>
                <div>
                  <h1 className=" text-center sm:text-left text-3xl py-2">Reset your password</h1>
                  <span className="text-center sm:text-left text-slate-500 text-md
          font-light mb-4">
                    Enter and confirm your new password
                  </span>
                </div>
                <div className="relative flex flex-col justify-between gap-2">
                  <FormLabel>New password</FormLabel>
                  <FormInput
                    value={password}
                    onChange={handlePasswordChange}
                    min={0}
                    type={showPassword ? "text" : "password"}
                    className="text-sm
            py-2.5
            sm:text-base
            sm:py-3" placeholder="Set your password" />
                  <img
                    onClick={togglePasswordShow}
                    className="cursor-pointer absolute bottom-4 right-4" src={showPasswordUrl} alt="showPassword" />
                </div>

                <div className="relative flex flex-col justify-between gap-2">
                  <FormLabel>Confirm password</FormLabel>
                  <FormInput
                    value={passwordVerify}
                    onChange={handlePasswordVerifyChange}
                    min={0}
                    type={showConfirmPassword ? "text" : "password"}
                    className="text-sm
            py-2.5
            sm:text-base
            sm:py-3"
                    placeholder="Set your password" />
                  <img
                    onClick={toggleConfirmPasswordShow}
                    className="cursor-pointer absolute bottom-4 right-4" src={showPasswordUrl} alt="showPassword" />
                </div>
                <Button className="
       w-full
       text-sm
       sm:text-lg
       font-light
       py-3
       bg-[#04032D] 
       text-white 
       rounded-xl
       gap-2
       group
       "
      onClick={handleForgetPassword}
      >Confirm
       <img
       className="
       scale-125
       group-hover:scale-150
       group-hover:translate-y-1
       group-hover:translate-x-1
       transition"
                    src={arrowUrl} alt="forward-arrow" />
                </Button>
        </Fragment>
      }
      </div>
          :
          //====(1) FORGOT PASSWORD MAIN SCREEN  ======
          <div className="flex flex-col gap-10">
            <div>
              <h1 className=" text-center sm:text-left text-3xl py-2">Forgot Password?</h1>
              <span className="text-center sm:text-left text-slate-500 text-md
              font-light mb-4">
                Enter your registered email address.We will send you an OTP for verification.
              </span>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <FormLabel>Enter phone number</FormLabel>
              <div className="flex flex-row gap-4">
                <FormInput
                  min={0}
                  type="number"
                  className="w-16 text-center"
                  placeholder="+91"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                />
                <FormInput
                  type="number"
                  className="text-sm
             py-2.5
             sm:text-base
             sm:py-3"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 text-slate-500 text-sm sm:text-lg font-light">
              <span className="w-[8rem] h-[1.5px] bg-slate-500/30"></span>
              <span>Or</span>
              <span className="w-[8rem] h-[1.5px] bg-slate-500/30"></span>
            </div>
            <div>
              <FormLabel>Email address</FormLabel>
              <FormInput
                type="text"
                className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
                placeholder="Enter your email"
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
            </div>
            <Button className="
           w-full
           text-sm
           sm:text-lg
           font-light
           py-3
           bg-[#04032D] 
           text-white 
           rounded-xl
           gap-2
           group
           "
              onClick={handleSubmitPhone}
            >Verify account
              <img
                className="
           scale-125
           group-hover:scale-150
           group-hover:translate-y-1
           group-hover:translate-x-1
           transition"
                src={arrowUrl} alt="forward-arrow" />
            </Button>
          </div>
      }
      </div>

      {/* == ALERT msg display == */}
      <div className="fixed w-full top-32">
      <ShowAlert message={successMessage} showAlert={showSuccessAlert} handleAlertDismiss={handleSuccessAlertDismissal} variant="success" />
        <ShowAlert message={failureMessage} showAlert={showFailureAlert} handleAlertDismiss={handleFailureAlertDismissal} variant="danger" />
      </div>
    </LoginSignupWrapper>
  )
}

export default ForgotPassword;