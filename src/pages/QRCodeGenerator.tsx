import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import QRCode from "qrcode";
import ExportQRImage from "../components/ExportQRImage";
import "./QRCodeGenerator.scss";

const QRCodeGenerator: React.FC = () => {
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);

  const generateQRCode = async (text: string) => {
    try {
      const qrCodeData = await QRCode.toDataURL(text);
      return qrCodeData;
    } catch (error) {
      return null;
    }
  };

  return (
    <div>
      <div className="container">
        <h1>QR Code Generator</h1>
        <Formik
          initialValues={{ text: "" }}
          validationSchema={Yup.object({
            text: Yup.string().required("Text is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const qrCodeData = await generateQRCode(values.text);
            setQRCodeData(qrCodeData);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field type="text" name="text" placeholder="Enter text here" />
                <ErrorMessage name="text" component="div" className="error" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Generate QR Code
              </button>
            </Form>
          )}
        </Formik>
        {qrCodeData && <img src={qrCodeData} alt="QR Code" />}
        {qrCodeData && <ExportQRImage qrCodeData={qrCodeData} />}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
