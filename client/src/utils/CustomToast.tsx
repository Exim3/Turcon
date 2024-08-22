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
      borderLeft: " 5px solid #a4f4e7",
      padding: "10px",
      maxWidth: "400px", // Added max-width for better control
      wordBreak: "break-word", // Handle long words
    }}
  >
    <div
      style={{ marginRight: "10px", fontSize: "20px", alignSelf: "flex-start" }}
    >
      <SuccessIconTick color="#15b097" size={20} />
    </div>
    <span style={{ color: "#221f1f", fontSize: "14px" }}>{message}</span>
  </div>
);
