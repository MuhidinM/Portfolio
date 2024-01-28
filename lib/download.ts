export const handleDownload = () => {
  const pdfUrl = "/MuhidinMisbah.pdf"; // Path to the PDF file in the public directory
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "MuhidinMisbah.pdf";
  link.click();
};
