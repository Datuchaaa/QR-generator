import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon className='download-icon' onClick={downloadQRCode} icon={faDownload} />
    </div>
  );
};

export default ExportQRImage;
