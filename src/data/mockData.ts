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
  { id: "1", name: "Camila Ferreira", email: "camila@email.com", phone: "(11) 99999-0001", totalSpent: 5890, totalOrders: 14, lastPurchase: "2026-04-14", status: "vip" },
  { id: "2", name: "Beatriz Almeida", email: "beatriz@email.com", phone: "(11) 99999-0002", totalSpent: 2480, totalOrders: 7, lastPurchase: "2026-04-12", status: "vip" },
  { id: "3", name: "Lucas Mendes", email: "lucas@email.com", phone: "(21) 99999-0003", totalSpent: 1590, totalOrders: 4, lastPurchase: "2026-04-10", status: "ativo" },
  { id: "4", name: "Isabela Costa", email: "isabela@email.com", phone: "(11) 99999-0004", totalSpent: 3200, totalOrders: 9, lastPurchase: "2026-04-13", status: "vip" },
  { id: "5", name: "Rafael Santos", email: "rafael@email.com", phone: "(31) 99999-0005", totalSpent: 899, totalOrders: 2, lastPurchase: "2026-03-25", status: "ativo" },
  { id: "6", name: "Mariana Oliveira", email: "mariana@email.com", phone: "(11) 99999-0006", totalSpent: 450, totalOrders: 1, lastPurchase: "2026-02-18", status: "inativo" },
  { id: "7", name: "Gustavo Lima", email: "gustavo@email.com", phone: "(21) 99999-0007", totalSpent: 7650, totalOrders: 20, lastPurchase: "2026-04-15", status: "vip" },
  { id: "8", name: "Carolina Rocha", email: "carolina@email.com", phone: "(11) 99999-0008", totalSpent: 1120, totalOrders: 3, lastPurchase: "2026-04-08", status: "ativo" },
];

export const products: Product[] = [
  { id: "1", name: "Trench Coat Classic", category: "Vestuário", price: 489.90, stock: 12, image: "🧥", status: "disponível" },
  { id: "2", name: "Bolsa Leather Tote", category: "Acessórios", price: 359.90, stock: 8, image: "👜", status: "disponível" },
  { id: "3", name: "Sneaker Essential", category: "Calçados", price: 279.90, stock: 3, image: "👟", status: "baixo estoque" },
  { id: "4", name: "Relógio Gold Edition", category: "Acessórios", price: 899.90, stock: 5, image: "⌚", status: "disponível" },
  { id: "5", name: "Lenço Silk Premium", category: "Acessórios", price: 189.90, stock: 18, image: "🧣", status: "disponível" },
  { id: "6", name: "Óculos Aviator Gold", category: "Acessórios", price: 329.90, stock: 0, image: "🕶️", status: "esgotado" },
  { id: "7", name: "Blazer Oversized Linho", category: "Vestuário", price: 529.90, stock: 6, image: "🧥", status: "disponível" },
  { id: "8", name: "Sandália Couro Natural", category: "Calçados", price: 249.90, stock: 2, image: "👡", status: "baixo estoque" },
];

export const sales: Sale[] = [
  { id: "V001", customer: "Camila Ferreira", items: ["Trench Coat Classic", "Lenço Silk Premium"], total: 679.80, date: "2026-04-14", status: "concluída", paymentMethod: "Cartão Crédito" },
  { id: "V002", customer: "Gustavo Lima", items: ["Relógio Gold Edition"], total: 899.90, date: "2026-04-14", status: "concluída", paymentMethod: "PIX" },
  { id: "V003", customer: "Isabela Costa", items: ["Bolsa Leather Tote", "Óculos Aviator Gold"], total: 689.80, date: "2026-04-13", status: "concluída", paymentMethod: "Cartão Débito" },
  { id: "V004", customer: "Lucas Mendes", items: ["Sneaker Essential"], total: 279.90, date: "2026-04-13", status: "pendente", paymentMethod: "PIX" },
  { id: "V005", customer: "Beatriz Almeida", items: ["Blazer Oversized Linho", "Sandália Couro Natural"], total: 779.80, date: "2026-04-12", status: "concluída", paymentMethod: "Cartão Crédito" },
  { id: "V006", customer: "Rafael Santos", items: ["Bolsa Leather Tote"], total: 359.90, date: "2026-04-11", status: "cancelada", paymentMethod: "Cartão Crédito" },
];

export const salesChartData = [
  { name: "Jan", vendas: 18400 },
  { name: "Fev", vendas: 22800 },
  { name: "Mar", vendas: 26200 },
  { name: "Abr", vendas: 31500 },
  { name: "Mai", vendas: 28900 },
  { name: "Jun", vendas: 35200 },
  { name: "Jul", vendas: 30800 },
];

export const categoryData = [
  { name: "Vestuário", value: 35 },
  { name: "Acessórios", value: 38 },
  { name: "Calçados", value: 18 },
  { name: "Outros", value: 9 },
];
