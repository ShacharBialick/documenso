import type { SVGAttributes } from 'react';

export type LogoProps = SVGAttributes<SVGSVGElement>;

/**
 * White-label wordmark: "THE OS COMPANY Signing Service".
 *
 * Text-based lockup in the app font stack (Inter). "THE OS COMPANY" is the
 * bold grotesque wordmark in the current text colour so it adapts to light
 * and dark themes; "SIGNING SERVICE" carries the brand red accent (#D40000),
 * which reads on both themes. The second tspan flows from the first, so the
 * lockup stays intact whichever font actually loads.
 */
export const BrandingLogo = ({ ...props }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1900 160"
      overflow="visible"
      preserveAspectRatio="xMinYMid meet"
      aria-label="TheOSCompany Signing Service"
      {...props}
    >
      <text x="0" y="122" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif">
        <tspan fill="currentColor" fontSize="124" fontWeight="800" letterSpacing="-2">
          THE OS COMPANY
        </tspan>
        <tspan dx="34" fill="#D40000" fontSize="62" fontWeight="600" letterSpacing="6">
          SIGNING SERVICE
        </tspan>
      </text>
    </svg>
  );
};
