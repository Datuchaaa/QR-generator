import React from 'react';

interface ExportQRImageProps {
  qrCodeData: string | null;
}

const ExportQRImage: React.FC<ExportQRImageProps> = ({ qrCodeData }) => {
  const downloadQRCode = () => {
    if (qrCodeData) {
      const link = document.createElement('a');
      link.href = qrCodeData;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <div>
      <button onClick={downloadQRCode}>Download QR Code</button>
    </div>
  );
};

export default ExportQRImage;
