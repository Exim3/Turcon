import React from "react";
import { format } from "date-fns";

interface TimeStampDisplayProps {
  timestamp: string;
  withTime?: boolean;
  showOnlyTime?: boolean;
}

const TimeStampDisplay: React.FC<TimeStampDisplayProps> = ({
  timestamp,
  withTime = false,
  showOnlyTime = false,
}) => {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return <span>Invalid Date</span>;
  }

  let formatStr = "";
  if (showOnlyTime) {
    formatStr = "HH:mm:ss"; // Time-only format
  } else if (withTime) {
    formatStr = "dd MMMM yyyy HH:mm:ss"; // Date and time
  } else {
    formatStr = "dd MMMM yyyy"; // Date-only format
  }

  const formattedDate = format(date, formatStr);

  return <span>{formattedDate}</span>;
};

export default TimeStampDisplay;
