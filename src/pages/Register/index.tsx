import { FormInput, FormCheck, FormSelect, FormLabel } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import { useTimezoneSelect, allTimezones, ITimezoneOption } from 'react-timezone-select'
import { useEffect, useState } from "react";
import { isPasswordValid } from "../../utils/common";
import { handleGetRequest, handlePostRequest } from "../../utils/http";
import { IUserResponse } from "../../models/user";
import { DEVICE_TYPE, OTP_DESTINATION, OTP_REQUEST_TYPE } from "../../utils/constants";
import Logo from "../../components/Logo";
import LoginSignupWrapper from "../../components/LoginSignupWrapper";
import showPasswordUrl from '../../assets/images/login-signup/show-password.png'
import VerifyOtp from "../../components/VerifyOTP";
import { twMerge } from "tailwind-merge";

function Main() {
  const navigate = useNavigate();
  const [countryCodeData,setCountryCodeData] = useState([])
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [timezone, setTimezone] = useState<number>(0
  )
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertSuccessMessage, setAlertSuccessMessage] = useState("");
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [userResponse, setUserResponse] = useState<IUserResponse>({
    email: "", user_type: 0, phone: "", country_code: "", first_name: "", last_name: "", device_token: "", device_type: "", app_version: ""
  });
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
  const [showLoaderPhoneOtpSub, setShowLoaderPhoneOtpSub] = useState(false);
  const [showLoaderEmailOtpSub, setShowLoaderEmailOtpSub] = useState(false);
  const [showLoaderRegisterationOtpSub, setShowRegisterationEmailOtpSub] = useState(false);
  const [requestOtpOngoing, setRequestOtpOngoing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const togglePasswordShow = () => {
    setShowPassword((val) => !val);
  }
  const toggleConfirmPasswordShow = () => {
    setShowConfirmPassword((val) => !val);
  }

  useEffect(() => {
    if (emailOtpVerified && phoneOtpVerified) {
      navigate("/add-org")

    }
  }, [emailOtpVerified, phoneOtpVerified])

  const callRequestOtp = async () => {
    const { email, phone, country_code, app_version, device_token } = userResponse;
    const body = {
      email,
      phone,
      country_code,
      "device_type": DEVICE_TYPE.WEB,
      timezone, app_version, device_token, request_type: OTP_REQUEST_TYPE.VERIFICATION_OTP
    };
    const resp = await handlePostRequest('/user/request-otp', body);
    if (resp.code >= 200 && resp.code < 300) {
      // run some logic
      setRequestOtpOngoing(false);
    } else {
      setAlertMessage(resp.message);
      setShowAlert(true);
    }
  }

  useEffect(() => {
    console.log(userResponse)
    if (showVerifyOtp && userResponse.email) {
      setRequestOtpOngoing(true);
      callRequestOtp();
    }
  }, [showVerifyOtp, userResponse])

  const handleSignIn = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/login")
  };

  const labelStyle = 'original'
  const timezones = {
    ...allTimezones,
  }

  const { options } = useTimezoneSelect({ labelStyle, timezones })

  const handleTimezoneChange = (val: string) => {
    setTimezone(parseFloat(val));
  }

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event: any) => {
    setLastName(event.target.value)
  }

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value)
  }

  const handleCountryCodeChange = (code:any) => {
    setCountryCode(code.idd.root + code.idd.suffixes);
    setCountryCodeData([])
  }
  const handleShowCountryCode=(event:any)=>{
    handleGetRequest("https://restcountries.com/v3.1/all?fields=name,idd,flag").then(data => {
      setCountryCodeData(data)
    })
    console.log(countryCodeData)
  }

  const handlePhoneNumberChange = (event: any) => {
    setPhoneNumber(event.target.value)
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }

  const handlePasswordVerifyChange = (event: any) => {
    setPasswordVerify(event.target.value)
  }

  const handleAlertDismiss = () => {
    setAlertMessage("");
    setShowAlert(false);
  }

  const handleSuccessAlertDismiss = () => {
    setAlertSuccessMessage("");
    setShowSuccessAlert(false);
  }

  const handleTermsAndConditionsCheck = () => {
    setTermsAndConditions((val) => !val)
  }

  const handleEmailOtp = (event: any) => {
    setEmailOtp(event.target.value)
  }

  const handlePhoneOtp = (event: any) => {
    setPhoneOtp(event.target.value)
  }

  const handleRegisterClick = async () => {

    // ** CHANGE IT ==>
    setShowVerifyOtp(true)


    if (!firstName) {
      setAlertMessage("Invalid first name");
      setShowAlert(true);
      return;
    }
    if (!lastName) {
      setAlertMessage("Invalid second name");
      setShowAlert(true);
      return;
    }
    const atpos = email.indexOf("@");
    const dotpos = email.lastIndexOf(".");
    if (atpos < 1 || (dotpos - atpos < 2)) {
      setAlertMessage("Invalid email address");
      setShowAlert(true);
      return;
    }
    if (!(countryCode && countryCode.indexOf("+") !== -1)) {
      setAlertMessage("Invalid country code");
      setShowAlert(true);
      return;
    }

    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!regex.test(phoneNumber)) {
      setAlertMessage("Invalid phone number");
      setShowAlert(true);
      return;
    }

    if (password !== passwordVerify) {
      setAlertMessage("Passwords didn't match");
      setShowAlert(true);
      return;
    }
    const passwordValid = await isPasswordValid(password);
    if (!passwordValid) {
      setAlertMessage("Invalid password. The passowrd must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, one special character.");
      setShowAlert(true);
      return;
    }

    if (!termsAndConditions) {
      setAlertMessage("Please accept the terms and conditions to continue");
      setShowAlert(true);
      return;
    }

    setShowRegisterationEmailOtpSub(true);
    /* setTimeout(() => {
      setShowVerifyOtp(true);
      setShowRegisterationEmailOtpSub(false)
    }, 5000)  */

    //call the API
    const suburl = "/user/sign-up"
    const jsonBody = {
      "first_name": firstName,
      "last_name": lastName,
      email,
      "country_code": countryCode,
      "phone": phoneNumber,
      password, timezone,
      "app_version": "1.1",
      "device_type": "1",
      "device_token": "device_token",
      "user_type": 1
    }
    const response = await handlePostRequest(suburl, jsonBody);
    if (response.code < 300 && response.code >= 200) {
      setUserResponse(response.data)
      setShowVerifyOtp(true);
      setShowRegisterationEmailOtpSub(false)
    } else {
      setAlertMessage(response.message);
      setShowAlert(true)
      setShowRegisterationEmailOtpSub(false)
    }
  }

  const [verifyPhone,setVerifyPhone] = useState(false);
  const handlePhoneOTPSubmit = async (otp:string) => {
    setVerifyPhone(true);
    console.log("hello from verify phone otp",otp);
    setPhoneOtp(otp);
    console.log(phoneOtp)

    if (phoneOtp.length !== 6) {
      setAlertMessage("Invalid phone OTP");
      setShowAlert(true);
      return;
    }
    setShowLoaderPhoneOtpSub(true);
    const suburl = "/user/verify";
    const jsonBody = {
      "country_code": countryCode,
      "phone": phoneNumber,
      "request_type": OTP_REQUEST_TYPE.VERIFICATION_OTP,
      "otp_destination": OTP_DESTINATION.MOBILE_OTP,
      "verification_otp": phoneOtp
    }
    /* setTimeout(() => {setAlertSuccessMessage("Phone OTP verified successfully");
    setShowSuccessAlert(true);
    setPhoneOtpVerified(true);
    setShowLoaderPhoneOtpSub(false);}, 5000) */
    const response = await handlePostRequest(suburl, jsonBody);
    if (response.code < 300 && response.code >= 200) {
      setAlertSuccessMessage("Phone OTP verified successfully");
      setShowSuccessAlert(true);
      setPhoneOtpVerified(true);
      setShowLoaderPhoneOtpSub(false);
    } else {
      setAlertMessage("Incorrect OTP");
      setShowAlert(true);
      setPhoneOtp("");
      setShowLoaderPhoneOtpSub(false);
    }
  }

  const [verifyEmail,setVerifyEmail] = useState(false);
  const handleEmailOTPSubmit = async (otp:string) => {
    setVerifyEmail(true);
    console.log("hello from verify email otp",otp);
    setEmailOtp(otp);
    console.log(emailOtp)

    if (emailOtp.length !== 6) {
      setAlertMessage("Invalid email OTP");
      setShowAlert(true);
      return;
    }
    setShowLoaderEmailOtpSub(true);
    const suburl = "/user/verify";
    const jsonBody = {
      "country_code": countryCode,
      "email": email,
      "request_type": OTP_REQUEST_TYPE.VERIFICATION_OTP,
      "otp_destination": OTP_DESTINATION.EMAIL_OTP,
      "verification_otp": emailOtp
    }
    const response = await handlePostRequest(suburl, jsonBody);
    console.log(response)
    if (response.code < 300 && response.code >= 200) {
      setAlertSuccessMessage("Email OTP verified successfully");
      setShowSuccessAlert(true);
      setEmailOtpVerified(true);
      setShowLoaderEmailOtpSub(false);
    } else {
      setAlertMessage("Incorrect OTP");
      setShowAlert(true);
      setEmailOtp("");
      setShowLoaderEmailOtpSub(false);
    }
  }

  return (
    <LoginSignupWrapper>
      {
        showVerifyOtp? 
        //===== VERIFY USER EMAIL AND PASSWORD SCREEN ====
        <div className="
        scrollbar-none
        px-[2.5rem]
        sm:px-[6rem]
        md:px-[12rem]
        lg:px-[5rem]
        pt-10
        pb-10
        gap-4
        overflow-y-auto
        flex
        flex-col
        justify-center
        h-screen
        w-full">
          <Logo/>
          <div className="py-5 flex items-center justify-start">
             {!verifyEmail?
             <div className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-[#A867F8]">01</div>
             :
             <div className="relative h-8 w-8 text-white text-2xl font-light flex items-center justify-center rounded-full bg-[#A867F8] ">
               <div className={twMerge([
                 "absolute animate-ping h-6 w-6 rounded-full bg-[#A867F8]",
                 verifyPhone && "hidden"
               ])}></div>
               &#10003;
             </div>
            }
             <div className="w-32 h-[2px] border border-[#A867F8]/70 border-dashed"></div>
            {!verifyPhone?
             <div className={twMerge([
              "h-10 w-10 flex items-center justify-center rounded-full border-2 border-slate-400/70",
              verifyEmail && "border-[#A867F8]"
             ])}>02</div>
             :
             <div className="relative h-8 w-8 text-white text-2xl font-light flex items-center justify-center rounded-full bg-[#A867F8] ">
               <div className="absolute animate-ping h-6 w-6 rounded-full bg-[#A867F8]"></div>
               &#10003;
             </div>
            }
          </div>
          {!verifyEmail ? <VerifyOtp 
           heading="Verify your Email"
           type="phone"
           onSubmit={handleEmailOTPSubmit}
            />:
           <VerifyOtp 
           heading="Verify your Phone number"
           type="email"
           onSubmit={handlePhoneOTPSubmit}
           />}
     </div>
     :
        // ==== REGISTER USERS SCREEN ====
        <div className="
        py-10
        px-[2.5rem]
        sm:px-[6rem]
        md:px-[12rem]
        lg:px-[4rem]
        xl:px-[7rem]
        gap-7
        overflow-y-auto
        scrollbar-none
        flex
        flex-col
        justify-start
        h-screen
        w-full">
          <Logo />
          <div>
            <h1 className="text-center sm:text-left text-3xl py-2">Get started for free</h1>

            <span className="text-center sm:text-left text-slate-500 text-md font-light mb-4">
              Already registered?
              <span className="cursor-pointer text-[#725FFE] font-medium" onClick={handleSignIn}> Sign in </span>
              to your account.
            </span>
          </div>

          <div className="flex flex-row justify-between w-full gap-8">
            <div className="flex w-full flex-col justify-between ">
              <FormLabel>First Name</FormLabel>
              <FormInput
                value={firstName}
                onChange={handleFirstNameChange}
                className="
            text-sm
            py-2.5
            sm:text-base
            " placeholder="Ex. John" />
            </div>
            <div className="w-full flex flex-col justify-between">
              <FormLabel>Last Name</FormLabel>
              <FormInput
                value={lastName}
                onChange={handleLastNameChange}
                className="
            text-sm
            py-2.5
            sm:text-base
            " placeholder="Ex. Doe" />
            </div>
          </div>

          <div className="flex flex-col justify-between ">
            <FormLabel>Email address</FormLabel>
            <FormInput
              value={email}
              onChange={handleEmailChange}
              min={0}
              type="text"
              className="text-sm
            py-2.5
            sm:text-base" placeholder="Enter your email" />
          </div>

          <div className="relative flex flex-col justify-between ">
            <FormLabel>Enter phone number</FormLabel>
            <div className="flex flex-row gap-3">
              <FormInput
                min={0}
                type="text"
                className="w-16 text-center"
                placeholder="+91"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={countryCode}
                onFocus={handleShowCountryCode}
                disabled={showLoaderRegisterationOtpSub === true}
              />
              <FormInput
                min={0}
                type="text"
                className="
                flex-1
                text-sm
                py-2.5
                sm:text-base" placeholder="Enter phone number"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                disabled={showLoaderRegisterationOtpSub === true}
              />
            </div>
            {countryCodeData.length > 0 && (
          <div className="z-[20] absolute w-48 h-40 overflow-y-auto top-20 left-0 bg-white rounded-lg border shadow-md flex flex-col p-2 gap-2 text-sm text-[#725FFE]/90">
            {countryCodeData.map((code) => {
              const {idd,flag}= code;
              const {root,suffixes}= idd;
              return(
              <div
                key={root + suffixes}
                onClick={()=>handleCountryCodeChange(code)}
                className="flex flex-row gap-3 hover:bg-slate-200/50 cursor-pointer rounded transition"
              >
                <h1>{flag}</h1>
                <h1>{root + suffixes}</h1>
              </div>
            )})}
          </div>
        )}
          </div>
          <div className="relative flex flex-col justify-between ">
            <FormLabel>Set password</FormLabel>
            <FormInput
              value={password}
              onChange={handlePasswordChange}
              min={0}
              type={showPassword ? "text" : "password"}
              className="text-sm
            py-2.5
            sm:text-base" placeholder="Enter here" />
            <img
              onClick={togglePasswordShow}
              className="cursor-pointer absolute bottom-3.5 right-4" src={showPasswordUrl} alt="showPassword" />
          </div>

          <div className="relative flex flex-col justify-between">
            <FormLabel>Confirm password</FormLabel>
            <FormInput
              value={passwordVerify}
              onChange={handlePasswordVerifyChange}
              min={0}
              type={showConfirmPassword ? "text" : "password"}
              className="text-sm
            py-2.5
            sm:text-base"
              placeholder="Enter here" />
            <img
              onClick={toggleConfirmPasswordShow}
              className="cursor-pointer absolute bottom-3.5 right-4" src={showPasswordUrl} alt="showPassword" />
          </div>
          <div className="flex 
          text-slate-500
          text-xs
          sm:text-base
          font-base
          w-full
          cursor-pointer
          gap-2
          ">
            <FormCheck>
              <FormCheck.Input
                onChange={handleTermsAndConditionsCheck}
                className="border-[0.1rem] p-3 rounded-lg"
                type="checkbox" />
            </FormCheck>
            I agree to the <span className="text-[#725FFE]">Terms of Services </span> and <span className="text-[#725FFE]"> Policy. </span>
          </div>

          <Button
          className="
          text-sm
          sm:text-base
          font-light
          py-2.5
          bg-[#04032D] 
          text-white 
          rounded-xl
          gap-2
          items-center
          group
          "onClick={handleRegisterClick}
          >
            Sign Up
           <span className="
          scale-120
          group-hover:scale-130
          group-hover:translate-y-1
          group-hover:translate-x-1
          transition">&rarr;</span>
          </Button>
        </div> 
    }
    </LoginSignupWrapper>
  );
}
export default Main;