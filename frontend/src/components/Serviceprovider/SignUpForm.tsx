// SignUpForm.tsx
import React from "react";
import FormInput from "./FormInput";
import personIcon from "../../assets/person.png";
import passwordIcon from "../../assets/password.png";

interface SignUpFormProps {
  name: string;
  setName: (value: string) => void;
  usernameValue: string;
  setUsernameValue: (value: string) => void;
  addressValue: string;
  passwordValue: string;
  emailValue: string;
  setEmailValue: (value: string) => void;
  setPasswordValue: (value: string) => void;
  confirmPasswordValue: string;
  setConfirmPasswordValue: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  countryValue: string;
  setCountryValue: (value: string) => void;
  setAddressValue: (value: string) => void;
  cityValue: string;
  setCityValue: (value: string) => void;
  stateValue: string;
  setStateValue: (value: string) => void;
  zipCodeValue: string;
  setZipCodeValue: (value: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  name,
  setName,
  usernameValue,
  setUsernameValue,
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
  confirmPasswordValue,
  setConfirmPasswordValue,
  phoneNumber,
  setPhoneNumber,
  countryValue,
  setCountryValue,
  addressValue,
  setAddressValue,
  cityValue,
  setCityValue,
  stateValue,
  setStateValue,
  zipCodeValue,
  setZipCodeValue,
}) => {
  return (
    <>
      <FormInput
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon={personIcon}
      />
      <FormInput
        type="text"
        placeholder="Username"
        value={usernameValue}
        onChange={(e) => setUsernameValue(e.target.value)}
        icon={personIcon}
      />
      <FormInput
        type="email"
        placeholder="Email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        icon={personIcon}
      />
      <div className="row">
        <div className="col-md-6">
          <FormInput
            type="password"
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            icon={passwordIcon}
          />
        </div>
        <div className="col-md-6">
          <FormInput
            type="password"
            placeholder="Confirm Password"
            value={confirmPasswordValue}
            onChange={(e) => setConfirmPasswordValue(e.target.value)}
            icon={passwordIcon}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <FormInput
            type="number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            icon={passwordIcon}
          />
        </div>
        <div className="col-md-6">
          <FormInput
            type="text"
            placeholder="Country"
            value={countryValue}
            onChange={(e) => setCountryValue(e.target.value)}
            icon={personIcon}
          />
        </div>
      </div>
      <div>
      <FormInput
            type="text"
            placeholder="Address"
            value={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
            icon={personIcon}
          />
        </div>
      <div className="row">
        <div className="col-md-6">
          <FormInput
            type="text"
            placeholder="State"
            value={stateValue}
            onChange={(e) => setStateValue(e.target.value)}
            icon={personIcon}
          />
        </div>
        <div className="col-md-6">
          <FormInput
            type="text"
            placeholder="City"
            value={cityValue}
            onChange={(e) => setCityValue(e.target.value)}
            icon={personIcon}
          />
        </div>
      </div>
      <FormInput
        type="text"
        placeholder="Zip Code"
        value={zipCodeValue}
        onChange={(e) => setZipCodeValue(e.target.value)}
        icon={personIcon}
      />
    </>
  );
};

export default SignUpForm;
