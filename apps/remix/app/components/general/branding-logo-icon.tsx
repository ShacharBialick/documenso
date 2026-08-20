import type { SVGAttributes } from 'react';

export type LogoProps = SVGAttributes<SVGSVGElement>;

/**
 * White-label icon mark: rounded square with "OS" in a bold grotesque,
 * matching the TheOSCompany Signing Service favicon. The square uses the
 * current text colour and the letters knock out to the page background, so
 * the mark adapts to light and dark themes.
 */
export const BrandingLogoIcon = ({ ...props }: LogoProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" aria-label="TheOSCompany Signing Service" {...props}>
      <rect x="2" y="2" width="80" height="80" rx="18" fill="currentColor" />
      <text
        x="42"
        y="45"
        textAnchor="middle"
        dominantBaseline="central"
        fill="hsl(var(--background, 0 0% 100%))"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="38"
        fontWeight="800"
      >
        OS
      </text>
    </svg>
  );
};
