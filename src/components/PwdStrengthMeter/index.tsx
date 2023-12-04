import React, { useEffect, useState } from "react";

const StrengthMeter = ({ password }) => {
  const calculatePasswordStrength = () => {
    let pwdCheck = 0;
    let validateRegex = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];
    validateRegex.forEach((regex, i) => {
      if (new RegExp(regex).test(password)) {
        pwdCheck += 1;
      }
    });
    return pwdCheck
  };

  const renderStrengthBars = (strength) => {
    
    return Array.from({ length: 4 }).map((_, index) => {
      const isFilled = index < strength;
      return (
        <div
          key={index}
          className={`h-full col-span-3 rounded ${
            isFilled ? "bg-success" : "bg-slate-100 dark:bg-darkmode-800"
          }`}
        ></div>
      );
    });
  };

  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const calculatedStrength = calculatePasswordStrength(password);
    setStrength(calculatedStrength);
  }, [password]);

  return (
    <div className="grid w-full h-1 grid-cols-12 gap-4 mt-3 intro-x">
      {renderStrengthBars(strength)}
    </div>
  );
};

export default StrengthMeter;
