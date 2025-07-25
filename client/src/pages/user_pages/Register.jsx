import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { name, email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateInputs = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) return "Name cannot be empty or just spaces.";
    if (name !== trimmedName) return "Name cannot start or end with a space.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail.match(emailRegex)) return "Enter a valid email address.";
    if (email !== trimmedEmail)
      return "Email cannot start or end with a space.";

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
    if (!password.match(passwordRegex))
      return "Password must be 8+ characters with uppercase, lowercase, number, and special character.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) return setError(validationError);

    try {
      await axios.post(`${globalBackendRoute}/api/register`, formData);
      alert("Registration successful. Redirecting to login.");
      navigate("/login");
    } catch {
      setError("Registration failed. Try again.");
    }
  };

  const renderInput = (label, type, id) => (
    <div>
      <label htmlFor={id} className="formLabel">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={formData[id]}
        onChange={handleChange}
        required
        className="mt-2 formInput"
      />
    </div>
  );

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FaUserPlus className="iconPrimary" />
        <h2 className="mt-6 text-center headingTextMobile lg:headingText">
          Register a new account
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <p className="errorText mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {renderInput("Name", "text", "name")}
          {renderInput("Email address", "email", "email")}
          {renderInput("Password", "password", "password")}

          <button type="submit" className="primaryBtn">
            Register
          </button>
        </form>

        <p className="mt-6 text-center paragraphTextMobile lg:paragraphText">
          Already have an account?{" "}
          <a href="/login" className="linkTextMobile lg:linkText">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
