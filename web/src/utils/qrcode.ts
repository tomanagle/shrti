import QRcode from "qrcode";

export function getQRCodeDataURL(str: string) {
  let dataUrl = "";

  QRcode.toDataURL(str, { version: 3 }, function (err, u) {
    dataUrl = u;
  });

  return dataUrl;
}
