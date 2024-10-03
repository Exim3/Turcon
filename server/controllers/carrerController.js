import CarrerFormModel from "../models/CarrerFormModel.js";

export const addCarrerForm = async (req, res) => {
  try {
    const { fullName, message, email, phone, department } = req.body;

    // Check for missing required fields
    if (!fullName || !email || !phone || !department) {
      return res.status(400).json({
        error: "All fields are required. Please fill in all the details.",
      });
    }

    // Create a new contact form entry
    const newForm = new CarrerFormModel({
      fullName,
      email,
      phone,
      message,
      department,
    });

    // Save the new form entry to the database
    await newForm.save();

    // Respond with success message
    return res.status(201).json({
      message:
        "Thank you for reaching out! Your query has been successfully submitted to our support team.",
    });
  } catch (error) {
    console.error("Error in addCarrerForm:", error.message);
    return res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
    });
  }
};

export const getCarrerForm = async (req, res) => {
  try {
    const { page = 0, rowsPerPage = 10 } = req.query;

    // Convert query parameters to numbers
    const pageNumber = Number(isNaN(page) ? 0 : page);
    const limit = Number(isNaN(rowsPerPage) ? 10 : rowsPerPage);

    // Fetch contact form entries with pagination
    const contactForms = await CarrerFormModel.find()
      .skip(pageNumber * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get the total count of contact forms
    const totalForms = await CarrerFormModel.countDocuments();

    // Send a successful response with data and pagination info
    res.status(200).json({ contactForms, totalForms });
  } catch (error) {
    console.error("Error in getCarrerForm:", error.message);
    return res.status(500).json({
      success: false,
      error: "An internal server error occurred. Please try again later.",
    });
  }
};
