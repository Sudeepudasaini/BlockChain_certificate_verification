// Validation Middleware
// Pure JS validation functions - no external dependencies

const validateRegister = (req, res, next) => {
  const errors = [];
  const { name, email, password } = req.body;

  // Check required fields
  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("Name is required and must be a non-empty string");
  }

  if (!email || typeof email !== "string" || email.trim() === "") {
    errors.push("Email is required");
  } else {
    // Email validation regex (lowercase only)
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.push("Email must be a valid lowercase email address (e.g. user@example.com)");
    }
    if (/[A-Z]/.test(email)) {
      errors.push('Email must be lowercase');
    }
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  // If there are errors, return 400 response
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const errors = [];
  const { email, password } = req.body;

  // Check required fields
  if (!email || typeof email !== "string" || email.trim() === "") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.push("Email must be a valid lowercase email address (e.g. user@example.com)");
    }
    if (/[A-Z]/.test(email)) {
      errors.push('Email must be lowercase');
    }
  }

  if (!password || typeof password !== "string" || password.trim() === "") {
    errors.push("Password is required");
  }

  // If there are errors, return 400 response
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

const validateCreateUniversity = (req, res, next) => {
  const errors = [];
  const { name, universityCode, email, password } = req.body;

  // Check required fields
  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("University name is required and must be a non-empty string");
  }

  if (
    !universityCode ||
    typeof universityCode !== "string" ||
    universityCode.trim() === ""
  ) {
    errors.push("University code is required");
  }

  if (!email || typeof email !== "string" || email.trim() === "") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.push("Email must be a valid lowercase email address (e.g. user@example.com)");
    }
    if (/[A-Z]/.test(email)) {
      errors.push('Email must be lowercase');
    }
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  // If there are errors, return 400 response
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

const sanitizeInput = (req, res, next) => {
  // Sanitize all string values in req.body
  if (req.body && typeof req.body === "object") {
    const sanitizeString = (str) => {
      if (typeof str !== "string") return str;
      // Trim whitespace
      str = str.trim();
      // Replace < with &lt; and > with &gt;
      str = str.replace(/</g, "&lt;");
      str = str.replace(/>/g, "&gt;");
      return str;
    };

    // Iterate through all properties in req.body
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        const value = req.body[key];
        if (typeof value === "string") {
          req.body[key] = sanitizeString(value);
        } else if (value && typeof value === "object") {
          // Recursively sanitize nested objects
          for (const nestedKey in value) {
            if (Object.prototype.hasOwnProperty.call(value, nestedKey)) {
              if (typeof value[nestedKey] === "string") {
                value[nestedKey] = sanitizeString(value[nestedKey]);
              }
            }
          }
        }
      }
    }
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateUniversity,
  sanitizeInput,
};
