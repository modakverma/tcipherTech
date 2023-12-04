import { FormInput, FormCheck, FormLabel } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../components/Logo";
import { handleGetRequest, handlePostRequest } from "../../utils/http";
import { DEVICE_TYPE } from "../../utils/constants";
import LoginSignupWrapper from "../../components/LoginSignupWrapper";
import arrowUrl from '../../assets/images/login-signup/forward-arrow.svg'
import showPasswordUrl from '../../assets/images/login-signup/show-password.png'

function Main() {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("")
  const [failureMessage, setFailureMessage] = useState("")
  const [showPassword,setShowPassword] = useState(false);

  const [countryCodeData,setCountryCodeData] = useState([])

  const togglePasswordShow=()=>{
    setShowPassword((val)=>!val);
  }
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/register')
  }

  const handleShowCountryCode=(event:any)=>{
    handleGetRequest("https://restcountries.com/v3.1/all?fields=name,idd,flag").then(data => {
      setCountryCodeData(data)
    })
    console.log(countryCodeData)
  }

  const handleForgotPassword = () => {
    // setShowForgetPwForm((val) => !val)
    navigate('/forgot-password')
  }
  const handleEmailChange = (event: any) => {
    setUserId(event.target.value)
  }
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }
  const handleSuccessAlertDismissal = () => {
    setSuccessMessage("");
    setShowSuccessAlert(false);
  }

  const handleCountryCodeChange = (code:any) => {
    setCountryCode(code.idd.root + code.idd.suffixes);
    setCountryCodeData([])
  }

  const handlePhoneNumberChange = (event: any) => {
    setPhoneNumber(event.target.value)
  }

  const handleFailureAlertDismissal = () => {
    setFailureMessage("");
    setShowFailureAlert(false);
  }
  const handlelogin = async () => {
    navigate('/add-org')
    const loginbody = {
      "password": password,
      "timezone": "5",
      "app_version": "1.1",
      "device_type": DEVICE_TYPE.WEB,
      "device_token": "device_token"
    }
    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userId);
    let phone = 0
    let prefix = ""
    let phoneNumberPart = ""
    if (userId.length === 0) {
      setFailureMessage("");
      setShowFailureAlert(false);
    } else if (!emailValid) {
      const phoneValid = /^\d{10}$/;
      if (userId.length < 10) {
        setFailureMessage("Please enter valid Number");
        setShowFailureAlert(false);
      }
      phoneNumberPart = userId.slice(-10);
      prefix = userId.slice(0, -10);
      if (phoneValid.test(phoneNumberPart)) {
        phone = 1
      }
      else {
        setFailureMessage("Please enter valid phone number or email");
        setShowFailureAlert(false);
      }
    }
    const resp = await handlePostRequest("/user/login", loginbody);
    if (resp.code >= 200 && resp.code < 300) {
      setSuccessMessage("Login successfully");
      setShowSuccessAlert(true);
      navigate("/login")
    } else {
      setFailureMessage("Something went wrong");
      setShowFailureAlert(true);
    }
  }

  return (
  <LoginSignupWrapper>
         <div className="
         py-10
         px-[2.5rem]
         sm:px-[6rem]
         md:px-[12rem]
         lg:px-[4rem]
         xl:px-[7rem]
         overflow-y-auto
         scrollbar-none
         flex
         flex-col
         gap-5
         justify-start
        h-screen
        w-full">
            <Logo />
            <div>
              <h1 className="text-center sm:text-left text-3xl py-2">Login to your account</h1>
              <span className="text-center sm:text-left text-slate-500 text-md font-light">
                Don’t have an account?
                <span className="cursor-pointer text-[#725FFE] font-medium" onClick={handleRegisterClick} > Sign up </span>
                for a free trial.
              </span>
            </div>

            <div className="relative flex flex-col justify-between">
            <FormLabel>Enter phone number</FormLabel>
            <div className="flex flex-row gap-4">
            <FormInput
                min={0}
                type="text"
                className="w-16 text-center"
                placeholder="+91"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={countryCode}
                onFocus={handleShowCountryCode}
                // disabled={showLoaderRegisterationOtpSub === true}
              />
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
            <FormInput 
            type="number"
            className="text-sm
             py-2.5
             sm:text-base" 
             placeholder="Enter phone number"
             value={phoneNumber}
            onChange={handlePhoneNumberChange}
             />
            </div>
            </div>
  
            <div className="flex flex-row items-center justify-center gap-2 text-slate-500 text-sm sm:text-lg font-light">
              <span className="w-[8rem] h-[1.5px] bg-slate-500/30"></span>
              <span>Or</span>
              <span className="w-[8rem] h-[1.5px] bg-slate-500/30"></span>
            </div>
  
            <div className="flex flex-col justify-between ">
              <FormLabel>Email address</FormLabel>
              <FormInput className="
             text-sm
             py-2.5
             sm:text-base
             " placeholder="Your working email" />
            </div>

            <div className="relative flex flex-col justify-between">
              <FormLabel>Enter password</FormLabel>
              <FormInput 
              type={showPassword?"text":"password"}
              className="
              relative
             text-sm
             py-2.5
             sm:text-base
             " placeholder="Enter here"/>

            {showPassword?<img 
           onClick={togglePasswordShow}
           className="cursor-pointer absolute bottom-4 right-4" src={showPasswordUrl} alt="showPassword" />:
           <img 
           onClick={togglePasswordShow}
           className="cursor-pointer absolute bottom-4 right-4" src={showPasswordUrl} alt="showPassword" />
           }
            </div>
  
            <div className="flex 
           justify-between
           text-slate-400
          text-xs
          sm:text-base
          font-normal
           w-full
           cursor-pointer
           ">
              <span className="flex gap-2">
                <FormCheck>
                  <FormCheck.Input 
                  className="border-[0.1rem] p-3 rounded-lg"
                  type="checkbox"/>
                </FormCheck>
                Remember me
              </span>
              <span className="hover:text-[#725FFE] transition" onClick={handleForgotPassword}>
                Forgot Password?
              </span>
            </div>
  
            <Button className="
           text-sm
           sm:text-base
           font-light
           py-2.5
           bg-[#04032D] 
           text-white 
           rounded-xl
           gap-2
           group
           "
           onClick={handlelogin}
           >Let's go!
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
  </LoginSignupWrapper>
  );
}
export default Main;