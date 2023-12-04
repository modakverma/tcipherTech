import { FormInput } from "../../base-components/Form";
import Button from "../../base-components/Button";
import arrowUrl from '../../assets/images/login-signup/forward-arrow.svg';
import { useRef, useState } from "react";

interface VerifyOtpProps {
    heading: string;
    type: 'phone' | 'email'; 
    onSubmit: (otp: string) => void; 
  }

const VerifyOtp: React.FC<VerifyOtpProps> = ({ heading, type, onSubmit }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

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

  const handleForgetPassword = () => {

    onSubmit(otp.join(''));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-center sm:text-left text-3xl py-2">{heading}</h1>
        <span className="text-center sm:text-left text-slate-500 text-md font-light mb-4">
          {type === 'phone' ? 'We’ve sent you a confirmation code on your phone number' : 'We’ve sent you a confirmation code on your email'}
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
      <Button
        className="w-full text-sm sm:text-lg font-light py-3 bg-[#04032D] text-white rounded-xl gap-2 group"
        onClick={handleForgetPassword}
      >
        Verify
        <img
          className="scale-125 group-hover:scale-150 group-hover:translate-y-1 group-hover:translate-x-1 transition"
          src={arrowUrl}
          alt="forward-arrow"
        />
      </Button>
    </div>
  );
};

export default VerifyOtp;

