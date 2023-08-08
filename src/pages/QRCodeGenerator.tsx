import React, { useState } from 'react';
import QRCode from 'qrcode';
import ExportQRImage from '../components/ExportQRImage';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);

  const generateQRCode = async () => {
    try {
      const qrCodeData = await QRCode.toDataURL(text);
      setQRCodeData(qrCodeData);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here"
        />
        <button onClick={generateQRCode}>Generate QR Code</button>
      </div>
      {qrCodeData && <img src={qrCodeData} alt="QR Code" />}
      {qrCodeData && <ExportQRImage qrCodeData={qrCodeData} />}
    </div>
  );
};

export default QRCodeGenerator;
