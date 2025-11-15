import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { marked } from "marked";
import htmlToPdfmake from "html-to-pdfmake";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
});

const MyPDF = ({ markdown }) => {
  const html = marked(markdown);
  const pdfContent = htmlToPdfmake(html);

  const docDefinition = {
    content: pdfContent,
    pageMargins: [20, 20, 20, 20],
  };

  pdfMake.createPdf(docDefinition).download("analysis.pdf");

  return <Document><Page size="A4" style={styles.page} /></Document>;
};

export default MyPDF;
