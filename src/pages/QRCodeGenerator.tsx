import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import QRCode from "qrcode";
import ExportQRImage from "../components/ExportQRImage";
import "./QRCodeGenerator.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

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

  const handleRefresh = (resetForm: () => void) => {
    setQRCodeData(null);
    resetForm();
  };

  return (
    <div>
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
        {({ isSubmitting, resetForm }) => (
          <Form>
            <div>
              <Field type="text" name="text" placeholder="Enter text here" />
              <FontAwesomeIcon
              className="refresh-icon"
                type="button"
                onClick={() => handleRefresh(resetForm)}
                icon={faArrowsRotate}
              />
              <ErrorMessage name="text" component="div" className="error" />
            </div>
            <div className="button-group">
              <button type="submit" disabled={isSubmitting}>
                Generate QR Code
              </button>
             
            </div>
          </Form>
        )}
      </Formik>
      {qrCodeData && <img src={qrCodeData} alt="QR Code" />}
      {qrCodeData && <ExportQRImage qrCodeData={qrCodeData} />}
    </div>
  );
};

export default QRCodeGenerator;
