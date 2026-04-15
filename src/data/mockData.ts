export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  totalOrders: number;
  lastPurchase: string;
  status: "ativo" | "inativo" | "vip";
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: "disponível" | "baixo estoque" | "esgotado";
}

export interface Sale {
  id: string;
  customer: string;
  items: string[];
  total: number;
  date: string;
  status: "concluída" | "pendente" | "cancelada";
  paymentMethod: string;
}

export const customers: Customer[] = [
  { id: "1", name: "Maria Silva", email: "maria@email.com", phone: "(11) 99999-0001", totalSpent: 4580, totalOrders: 12, lastPurchase: "2026-04-10", status: "vip" },
  { id: "2", name: "João Santos", email: "joao@email.com", phone: "(11) 99999-0002", totalSpent: 1250, totalOrders: 5, lastPurchase: "2026-04-08", status: "ativo" },
  { id: "3", name: "Ana Oliveira", email: "ana@email.com", phone: "(11) 99999-0003", totalSpent: 3200, totalOrders: 9, lastPurchase: "2026-04-12", status: "vip" },
  { id: "4", name: "Carlos Pereira", email: "carlos@email.com", phone: "(11) 99999-0004", totalSpent: 890, totalOrders: 3, lastPurchase: "2026-03-20", status: "ativo" },
  { id: "5", name: "Fernanda Lima", email: "fernanda@email.com", phone: "(11) 99999-0005", totalSpent: 560, totalOrders: 2, lastPurchase: "2026-02-15", status: "inativo" },
  { id: "6", name: "Pedro Costa", email: "pedro@email.com", phone: "(11) 99999-0006", totalSpent: 7800, totalOrders: 18, lastPurchase: "2026-04-14", status: "vip" },
  { id: "7", name: "Juliana Mendes", email: "juliana@email.com", phone: "(11) 99999-0007", totalSpent: 1890, totalOrders: 6, lastPurchase: "2026-04-05", status: "ativo" },
  { id: "8", name: "Roberto Alves", email: "roberto@email.com", phone: "(11) 99999-0008", totalSpent: 340, totalOrders: 1, lastPurchase: "2026-01-10", status: "inativo" },
];

export const products: Product[] = [
  { id: "1", name: "Vestido Floral Midi", category: "Vestidos", price: 289.90, stock: 15, image: "👗", status: "disponível" },
  { id: "2", name: "Calça Jeans Skinny", category: "Calças", price: 199.90, stock: 3, image: "👖", status: "baixo estoque" },
  { id: "3", name: "Blusa Social Seda", category: "Blusas", price: 179.90, stock: 22, image: "👚", status: "disponível" },
  { id: "4", name: "Saia Lápis Couro", category: "Saias", price: 249.90, stock: 0, image: "🩳", status: "esgotado" },
  { id: "5", name: "Jaqueta Jeans Oversized", category: "Jaquetas", price: 349.90, stock: 8, image: "🧥", status: "disponível" },
  { id: "6", name: "Camiseta Básica Premium", category: "Camisetas", price: 89.90, stock: 45, image: "👕", status: "disponível" },
  { id: "7", name: "Shorts Alfaiataria", category: "Shorts", price: 159.90, stock: 2, image: "🩳", status: "baixo estoque" },
  { id: "8", name: "Blazer Estruturado", category: "Blazers", price: 429.90, stock: 6, image: "🧥", status: "disponível" },
];

export const sales: Sale[] = [
  { id: "V001", customer: "Maria Silva", items: ["Vestido Floral Midi", "Blusa Social Seda"], total: 469.80, date: "2026-04-14", status: "concluída", paymentMethod: "Cartão Crédito" },
  { id: "V002", customer: "Pedro Costa", items: ["Jaqueta Jeans Oversized"], total: 349.90, date: "2026-04-14", status: "concluída", paymentMethod: "PIX" },
  { id: "V003", customer: "Ana Oliveira", items: ["Blazer Estruturado", "Calça Jeans Skinny"], total: 629.80, date: "2026-04-13", status: "concluída", paymentMethod: "Cartão Débito" },
  { id: "V004", customer: "João Santos", items: ["Camiseta Básica Premium"], total: 89.90, date: "2026-04-13", status: "pendente", paymentMethod: "PIX" },
  { id: "V005", customer: "Juliana Mendes", items: ["Shorts Alfaiataria", "Blusa Social Seda"], total: 339.80, date: "2026-04-12", status: "concluída", paymentMethod: "Cartão Crédito" },
  { id: "V006", customer: "Carlos Pereira", items: ["Vestido Floral Midi"], total: 289.90, date: "2026-04-11", status: "cancelada", paymentMethod: "Cartão Crédito" },
];

export const salesChartData = [
  { name: "Jan", vendas: 12400 },
  { name: "Fev", vendas: 15800 },
  { name: "Mar", vendas: 18200 },
  { name: "Abr", vendas: 22100 },
  { name: "Mai", vendas: 19500 },
  { name: "Jun", vendas: 24800 },
  { name: "Jul", vendas: 21300 },
];

export const categoryData = [
  { name: "Vestidos", value: 32 },
  { name: "Calças", value: 24 },
  { name: "Blusas", value: 20 },
  { name: "Jaquetas", value: 14 },
  { name: "Outros", value: 10 },
];
