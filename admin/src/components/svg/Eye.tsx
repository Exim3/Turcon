import React from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const EyeIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      color={color}
    >
      <path
        fill="currentColor"
        d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
      />
    </svg>
  );
};

export default EyeIcon;

export const EyeCloseIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      color={color}
    >
      <path fill="currentColor" d="M12.49 9.94A2.5 2.5 0 0 0 10 7.5z" />
      <path
        fill="currentColor"
        d="M8.2 5.9a4.4 4.4 0 0 1 1.8-.4a4.5 4.5 0 0 1 4.5 4.5a4.3 4.3 0 0 1-.29 1.55L17 14.14A14 14 0 0 0 20 10s-3-7-10-7a9.6 9.6 0 0 0-4 .85zM2 2L1 3l2.55 2.4A13.9 13.9 0 0 0 0 10s3 7 10 7a9.7 9.7 0 0 0 4.64-1.16L18 19l1-1zm8 12.5A4.5 4.5 0 0 1 5.5 10a4.45 4.45 0 0 1 .6-2.2l1.53 1.44a2.5 2.5 0 0 0-.13.76a2.49 2.49 0 0 0 3.41 2.32l1.54 1.45a4.47 4.47 0 0 1-2.45.73"
      />
    </svg>
  );
};
export const ExitIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-x"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
