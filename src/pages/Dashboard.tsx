import { DollarSign, Users, ShoppingBag, TrendingUp, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import MetricCard from "@/components/MetricCard";
import { salesChartData, categoryData, sales, customers } from "@/data/mockData";

const COLORS = ["hsl(43, 60%, 54%)", "hsl(43, 70%, 72%)", "hsl(43, 50%, 38%)", "hsl(0, 0%, 40%)"];

const Dashboard = () => {
  const recentSales = sales.slice(0, 5);
  const topCustomers = customers.filter(c => c.status === "vip").slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão geral da Usemari</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Faturamento" value="R$ 31.500" change="+15% vs mês anterior" changeType="positive" icon={DollarSign} />
        <MetricCard title="Clientes" value="186" change="+12 novos este mês" changeType="positive" icon={Users} />
        <MetricCard title="Produtos" value="54" change="2 com estoque baixo" changeType="neutral" icon={ShoppingBag} />
        <MetricCard title="Ticket Médio" value="R$ 412" change="+10% vs mês anterior" changeType="positive" icon={TrendingUp} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <div className="glass-card col-span-2 rounded-xl p-5">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Vendas Mensais</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesChartData}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(43, 60%, 54%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(43, 60%, 54%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="name" stroke="hsl(0, 0%, 40%)" fontSize={12} />
              <YAxis stroke="hsl(0, 0%, 40%)" fontSize={12} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: "8px", color: "hsl(45, 20%, 90%)" }}
                formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Vendas"]}
              />
              <Area type="monotone" dataKey="vendas" stroke="hsl(43, 60%, 54%)" fill="url(#goldGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Chart */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Vendas por Categoria</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: "8px", color: "hsl(45, 20%, 90%)" }}
                formatter={(value: number) => [`${value}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {categoryData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Sales */}
        <div className="glass-card rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold text-foreground">Vendas Recentes</h3>
            <button className="flex items-center gap-1 text-xs text-primary hover:underline">
              Ver todas <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium text-foreground">{sale.customer}</p>
                  <p className="text-xs text-muted-foreground">{sale.items.join(", ")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">R$ {sale.total.toFixed(2)}</p>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    sale.status === "concluída" ? "bg-emerald-500/10 text-emerald-400" :
                    sale.status === "pendente" ? "bg-yellow-500/10 text-yellow-400" :
                    "bg-red-500/10 text-red-400"
                  }`}>
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="glass-card rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold text-foreground">Clientes VIP</h3>
            <button className="flex items-center gap-1 text-xs text-primary hover:underline">
              Ver todos <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {topCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {customer.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">{customer.totalOrders} pedidos</p>
                  </div>
                </div>
                <p className="text-sm font-semibold gold-text">R$ {customer.totalSpent.toLocaleString("pt-BR")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
