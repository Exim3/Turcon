import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Paper, Button } from "@mui/material";
import {
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { WarningIcon } from "../svg/Tick";

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const MAX_FILE_SIZE_MB = 2; // Maximum file size in megabytes
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // Convert megabytes to bytes

interface DragFileProps {
  onFileChange: (file: File | null) => void;
}

const DragFile: React.FC<DragFileProps> = ({ onFileChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    // Clean up the object URL when the component unmounts or file changes
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (allowedTypes.includes(selectedFile.type)) {
        if (selectedFile.size <= MAX_FILE_SIZE_BYTES) {
          setFile(selectedFile);
          onFileChange(selectedFile);
          setError(null);

          // Generate a URL for the file and store it
          const previewUrl = URL.createObjectURL(selectedFile);
          setFilePreview(previewUrl);
        } else {
          setError(
            `File size exceeds ${MAX_FILE_SIZE_MB}MB. Please select a smaller file.`
          );
        }
      } else {
        setError(
          "Unsupported file type. Please upload a PDF, Word document, or image."
        );
      }
    }
    setFile(selectedFile || null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    setError(null);
  };

  const handleOpenPreview = () => {
    if (filePreview) {
      window.open(filePreview, "_blank");
    }
  };

  return (
    <Box className="file-upload-container" textAlign="center">
      {!file ? (
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            mx: "auto",
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: "grey.300",
            p: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: 2,
            bgcolor: "grey.100",
            height: "10rem",
          }}
        >
          <input
            type="file"
            accept=".pdf, .doc, .docx, .jpg, .png"
            onChange={handleFileChange}
            disabled={!!file} // Disable input if a file is uploaded
            style={{ display: "none" }}
            id="file-input"
            aria-label="Select a file"
          />
          <label
            htmlFor="file-input"
            role="button"
            aria-label="Select a file"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <CloudUploadIcon color="action" style={{ fontSize: 40 }} />
            <Typography variant="body2" color="textSecondary">
              Drag & Drop or Click to Select File
            </Typography>
          </label>
        </Paper>
      ) : (
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            mx: "auto",
            p: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 2,
            justifyContent: "space-between",
            bgcolor: "grey.100",
            gap: "10px",
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 2, fontSize: "14px", fontWeight: 600, my: "auto" }}
          >
            {file.name}
          </Typography>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenPreview}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Preview
            </Button>
            <IconButton
              onClick={handleRemoveFile}
              color="primary"
              aria-label="Remove selected file"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
      {error && (
        <Typography
          variant="body2"
          color="#c03744"
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          aria-live="assertive"
        >
          <WarningIcon color="#c03744" className="self-start" />
          <p className="text-[10px]"> {error}</p>
        </Typography>
      )}
    </Box>
  );
};

export default DragFile;
