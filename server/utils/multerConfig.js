// multerConfig.js
import multer from "multer";
import path from "path";

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Rename file to avoid overwriting
  },
});

// Create multer instance
const upload = multer({ storage: storage });

// Export as default
export default upload;
