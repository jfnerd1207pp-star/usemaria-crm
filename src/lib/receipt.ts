import jsPDF from "jspdf";

export interface ReceiptItem {
  name: string;
  qty: number;
  price: number;
}

export interface ReceiptData {
  saleId: string;
  customer: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  date: Date;
}

export function generateReceiptPDF(data: ReceiptData) {
  const doc = new jsPDF({ unit: "mm", format: [80, 200 + data.items.length * 6] });
  const w = 80;
  let y = 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("USEMARI", w / 2, y, { align: "center" });
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Comprovante de Venda", w / 2, y, { align: "center" });
  y += 6;

  doc.setLineDashPattern([1, 1], 0);
  doc.line(4, y, w - 4, y);
  y += 5;

  doc.setFontSize(8);
  doc.text(`Código: ${data.saleId}`, 4, y); y += 4;
  doc.text(`Data: ${data.date.toLocaleString("pt-BR")}`, 4, y); y += 4;
  doc.text(`Cliente: ${data.customer}`, 4, y); y += 4;
  doc.text(`Pagamento: ${data.paymentMethod}`, 4, y); y += 5;

  doc.line(4, y, w - 4, y);
  y += 4;

  doc.setFont("helvetica", "bold");
  doc.text("Item", 4, y);
  doc.text("Qtd", 50, y);
  doc.text("Total", w - 4, y, { align: "right" });
  y += 3;
  doc.setFont("helvetica", "normal");
  doc.line(4, y, w - 4, y);
  y += 4;

  data.items.forEach((item) => {
    const name = item.name.length > 28 ? item.name.slice(0, 27) + "…" : item.name;
    doc.text(name, 4, y);
    doc.text(String(item.qty), 50, y);
    doc.text(`R$ ${(item.price * item.qty).toFixed(2)}`, w - 4, y, { align: "right" });
    y += 4;
    doc.setTextColor(120);
    doc.text(`  R$ ${item.price.toFixed(2)} un.`, 4, y);
    doc.setTextColor(0);
    y += 4;
  });

  doc.line(4, y, w - 4, y);
  y += 5;

  doc.text("Subtotal", 4, y);
  doc.text(`R$ ${data.subtotal.toFixed(2)}`, w - 4, y, { align: "right" });
  y += 4;
  if (data.discount > 0) {
    doc.text("Desconto", 4, y);
    doc.text(`- R$ ${data.discount.toFixed(2)}`, w - 4, y, { align: "right" });
    y += 4;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("TOTAL", 4, y);
  doc.text(`R$ ${data.total.toFixed(2)}`, w - 4, y, { align: "right" });
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.line(4, y, w - 4, y);
  y += 5;
  doc.text("Obrigada pela preferência!", w / 2, y, { align: "center" });
  y += 4;
  doc.text("usemaria.netlify.app", w / 2, y, { align: "center" });

  doc.save(`comprovante-${data.saleId}.pdf`);
}
