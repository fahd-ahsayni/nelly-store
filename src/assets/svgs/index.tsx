import * as React from "react";

interface SvgStarProps extends React.SVGProps<SVGSVGElement> {}

const SvgStar = (props: SvgStarProps): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 200 200"
    className={props.className}
    {...props}
  >
    <g clipPath="url(#clip0_116_153)">
      <path d="M100 0c3.395 53.76 46.24 96.605 100 100-53.76 3.395-96.605 46.24-100 100-3.395-53.76-46.24-96.605-100-100C53.76 96.605 96.605 53.76 100 0"></path>
    </g>
    <defs>
      <clipPath id="clip0_116_153">
        <path fill="#fff" d="M0 0h200v200H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default SvgStar;
