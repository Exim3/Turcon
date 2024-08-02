import React from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const CheckIcon: React.FC<IconProps> = ({ color = "#15B097", size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icon-tabler-rosette-discount-check"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );
};

export default CheckIcon;

export const BackIcon: React.FC<IconProps> = ({
  color = "#15B097",
  size = 24,
}) => {
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
        d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"
      />
    </svg>
  );
};

export const FileIcon: React.FC<IconProps> = ({
  color = "#15B097",
  size = 24,
}) => {
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
        d="M13 9V3.5L18.5 9M6 2c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      />
    </svg>
  );
};
export const PreviewIcon: React.FC<IconProps> = ({
  color = "white",
  size = 24,
}) => {
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
        d="M5.616 20q-.667 0-1.141-.475T4 18.386V5.615q0-.666.475-1.14T5.615 4h12.77q.666 0 1.14.475T20 5.615v12.77q0 .666-.475 1.14t-1.14.475zm0-1h12.769q.269 0 .442-.173t.173-.442V7H5v11.385q0 .269.173.442t.443.173M12 16q-1.627 0-2.932-.834Q7.763 14.333 7.096 13q.667-1.333 1.972-2.166Q10.373 10 12 10t2.932.834T16.904 13q-.667 1.333-1.972 2.166Q13.627 16 12 16m-.004-1.884q-.467 0-.79-.327q-.321-.327-.321-.793q0-.467.326-.79q.327-.321.793-.321q.467 0 .79.326q.322.327.322.793q0 .467-.327.79q-.327.322-.793.322m.004.769q.78 0 1.333-.552T13.885 13t-.552-1.333q-.552-.552-1.333-.552t-1.333.552T10.115 13t.552 1.333t1.333.552"
      />
    </svg>
  );
};
