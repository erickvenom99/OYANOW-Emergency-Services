import React from "react";
import FormInput from "./FormInput";
import personIcon from "../../assets/person.png";
import passwordIcon from "../../assets/password.png";

interface SignUpFormProps {
  name: string;
  setName: (value: string) => void;
  usernameValue: string;
  setUsernameValue: (value: string) => void;
  emailValue: string;
  setEmailValue: (value: string) => void;
  passwordValue: string;
  setPasswordValue: (value: string) => void;
  confirmPasswordValue: string;
  setConfirmPasswordValue: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  selectedService: string; // Change to a single string
  setSelectedService: (value: string) => void; // Change to a setter for a single string
  setCoordinates: (value: [number, number] | null) => void; 
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
  selectedService,
  setSelectedService,
}) => {
  const services = ["Mechanic", "Electrician", "Plumber"];

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value); // Store the selected service as a string
  };

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
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            icon={passwordIcon}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="services" className="block mb-2">Select Service</label>
          <select
            id="services"
            value={selectedService} // Now a single string
            onChange={handleServiceChange}
            className="w-full bg-transparent border border-gray-300 p-2"
          >
            <option value="" disabled>Select Service</option>
            {services.map(service => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;