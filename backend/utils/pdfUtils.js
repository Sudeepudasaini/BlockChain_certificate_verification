const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const qrcode = require("qrcode");

const generateCertificatePdf = async ({ certificate, qrUrl }) => {
  const outputFileName = `certificate-${certificate.certId}.pdf`;
  const outputPath = path.join("uploads", outputFileName);

  const qrDataUrl = await qrcode.toDataURL(qrUrl, { errorCorrectionLevel: "H" });
  const qrBuffer = Buffer.from(qrDataUrl.split(",")[1], "base64");

  const doc = new PDFDocument({ size: "A4", margin: 48 });
  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#F8FAFC");
  doc.fillColor("#111827").fontSize(26).text("Academic Certificate", {
    align: "center",
    underline: true,
  });

  doc.moveDown(1.5);
  doc.fillColor("#475569").fontSize(12).text("This certificate is awarded to", {
    align: "center",
  });

  doc.moveDown(0.8);
  doc.fillColor("#1E293B").fontSize(24).text(certificate.studentName, {
    align: "center",
    bold: true,
  });

  doc.moveDown(0.6);
  doc.fontSize(14).fillColor("#475569").text(`For successful completion of the ${certificate.degree} program`, {
    align: "center",
  });

  if (certificate.major) {
    doc.moveDown(0.4);
    doc.fontSize(14).fillColor("#475569").text(`Major: ${certificate.major}`, {
      align: "center",
    });
  }

  doc.moveDown(1.4);
  doc.fontSize(13).fillColor("#0F172A").text(`Institution: ${certificate.universityName}`, {
    align: "center",
  });
  doc.moveDown(0.4);
  doc.text(`Issue Date: ${new Date(certificate.issueDate).toLocaleDateString()}`, {
    align: "center",
  });
  doc.moveDown(0.4);
  doc.text(`Certificate ID: ${certificate.certId}`, {
    align: "center",
  });

  doc.moveDown(1.2);
  doc.fontSize(11).fillColor("#475569").text(
    "Scan the QR code below or visit the verification portal to validate this certificate.",
    {
      align: "center",
      lineGap: 4,
    }
  );

  const qrX = doc.page.width / 2 - 70;
  doc.image(qrBuffer, qrX, doc.y + 20, { width: 140, height: 140 });

  doc.moveDown(9);
  doc.fontSize(10).fillColor("#64748B").text(`Verification URL: ${qrUrl}`, {
    align: "center",
    lineGap: 4,
  });

  doc.end();

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });

  return outputPath;
};

module.exports = {
  generateCertificatePdf,
};
