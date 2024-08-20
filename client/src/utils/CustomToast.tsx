import { SuccessIconTick } from "../components/svg/Tick";

// Interface for custom toast component props
export interface CustomToastProps {
  message: string;
}

// Custom toast component
export const CustomSuccessToast: React.FC<CustomToastProps> = ({ message }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      border: " 2px solid #c8e6c9",
      color: "#b9f6ca",
      padding: "10px",
      borderRadius: "8px",
      maxWidth: "400px", // Added max-width for better control
      wordBreak: "break-word", // Handle long words
    }}
  >
    <div style={{ marginRight: "10px", fontSize: "20px" }}>
      <SuccessIconTick color="green" />
    </div>
    <span style={{ color: "green", fontSize: "14px" }}>{message}</span>
  </div>
);
