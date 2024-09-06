// LoginForm.tsx
import React from "react";
import FormInput from "./FormInput";
import emailIcon from "../../assets/email.png";
import passwordIcon from "../../assets/password.png";

interface LoginFormProps {
  emailValue: string;
  setEmailValue: (value: string) => void;
  passwordValue: string;
  setPasswordValue: (value: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
}) => {
  return (
    <>
      <FormInput
        type="email"
        placeholder="Email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        icon={emailIcon}
      />
      <FormInput
        type="password"
        placeholder="Password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        icon={passwordIcon}
      />
    </>
  );
};

export default LoginForm;
