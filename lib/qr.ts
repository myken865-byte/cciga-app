import QRCode from "qrcode";

/** Generates a QR code as a data-URI PNG, embeddable directly in a @react-pdf/renderer <Image>. */
export async function generateVerificationQrDataUri(url: string): Promise<string> {
  return QRCode.toDataURL(url, { margin: 1, width: 240 });
}
