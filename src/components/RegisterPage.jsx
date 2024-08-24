import { checkEmailExists } from "../services/user";

const handleRegister = async (event) => {
  event.preventDefault();

  // Reset errors
  setError({});

  // Validate form
  if (validateForm()) {
    try {
      // Check if the email already exists
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setError((prevError) => ({
          ...prevError,
          email: "Email already exists",
        }));
        return;
      }

      // Create the registration request payload
      const registerRequest = { name, email, password };

      // Register the new user
      await register(registerRequest);

      // Navigate to the login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific error cases if needed
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.errors;
        const formattedErrors = {};

        // Map server errors to our error state
        serverErrors.forEach((err) => {
          formattedErrors[err.field] = err.defaultMessage;
        });

        setError(formattedErrors);
      } else {
        // General error fallback
        setError((prevError) => ({
          ...prevError,
          general: "An error occurred during registration. Please try again.",
        }));
      }
    }
  }
};
