import type { PDFFont, PDFPage } from '@cantoo/pdf-lib';
import { rgb } from '@cantoo/pdf-lib';

/**
 * The visible "adoption stamp" drawn around every signature field in the
 * sealed PDF: a thin dark rounded frame, a short label overlapping the
 * top-left border, and a truncated signature ID under the bottom border.
 *
 * The ID is the signature field's `secondaryId` — the same value printed as
 * "Signature ID" on the Signing Certificate page — so the visible mark on the
 * document cross-references the audit certificate. It is traceability UX, not
 * cryptography: the cryptographic integrity comes from the PDF seal. The
 * recipient signing token is a bearer credential and is never used here.
 */

export const ADOPTION_STAMP_LABEL = 'Signed via TheOSCompany Sign:';
export const ADOPTION_STAMP_LABEL_SHORT = 'OS-Signed by:';
export const ADOPTION_STAMP_ID_PREFIX_LENGTH = 16;

export const formatAdoptionStampId = (secondaryId: string) =>
  `ID: ${secondaryId.slice(0, ADOPTION_STAMP_ID_PREFIX_LENGTH).toUpperCase()}...`;

export type DrawAdoptionStampOptions = {
  page: PDFPage;
  font: PDFFont;
  /** Field box in PDF coordinates (origin bottom-left). */
  x: number;
  y: number;
  width: number;
  height: number;
  secondaryId: string;
};

const FRAME_COLOR = rgb(0.12, 0.12, 0.12);
const ID_COLOR = rgb(0.35, 0.35, 0.35);
const LABEL_FONT_SIZE = 6.5;
const ID_FONT_SIZE = 6;
const FRAME_WIDTH = 0.8;

/**
 * Draw the adoption stamp with pdf-lib primitives (V1/legacy insertion paths).
 * Only called for unrotated pages — the rotated-page transforms differ per
 * element and the modern V2 path covers rotation natively.
 */
export const drawAdoptionStamp = ({ page, font, x, y, width, height, secondaryId }: DrawAdoptionStampOptions) => {
  // Thin dark frame around the field box.
  page.drawRectangle({
    x,
    y,
    width,
    height,
    borderColor: FRAME_COLOR,
    borderWidth: FRAME_WIDTH,
  });

  // Label overlapping the top-left border, on a white patch so it reads as
  // interrupting the frame line.
  let label = ADOPTION_STAMP_LABEL;
  let labelWidth = font.widthOfTextAtSize(label, LABEL_FONT_SIZE);

  if (labelWidth > width - 16) {
    label = ADOPTION_STAMP_LABEL_SHORT;
    labelWidth = font.widthOfTextAtSize(label, LABEL_FONT_SIZE);
  }

  const labelPadX = 3;
  const labelBoxHeight = LABEL_FONT_SIZE + 3;
  const topEdge = y + height;

  page.drawRectangle({
    x: x + 6 - labelPadX,
    y: topEdge - labelBoxHeight / 2,
    width: labelWidth + labelPadX * 2,
    height: labelBoxHeight,
    color: rgb(1, 1, 1),
  });

  page.drawText(label, {
    x: x + 6,
    y: topEdge - labelBoxHeight / 2 + 2,
    size: LABEL_FONT_SIZE,
    font,
    color: FRAME_COLOR,
  });

  // Truncated signature ID under the bottom border.
  page.drawText(formatAdoptionStampId(secondaryId), {
    x: x + 6,
    y: y - ID_FONT_SIZE - 2,
    size: ID_FONT_SIZE,
    font,
    color: ID_COLOR,
  });
};
