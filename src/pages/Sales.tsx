import { Search, Calendar } from "lucide-react";
import { useState } from "react";
import { sales } from "@/data/mockData";

const statusStyles = {
  "concluída": "bg-emerald-500/10 text-emerald-400",
  "pendente": "bg-yellow-500/10 text-yellow-400",
  "cancelada": "bg-red-500/10 text-red-400",
};

const Sales = () => {
  const [search, setSearch] = useState("");

  const filtered = sales.filter((s) =>
    s.customer.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Vendas</h1>
        <p className="text-sm text-muted-foreground">{sales.length} vendas registradas</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por cliente ou código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-card px-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="glass-card overflow-hidden rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Código</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cliente</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Itens</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Data</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pagamento</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sale) => (
              <tr key={sale.id} className="border-b border-border/50 transition-colors hover:bg-secondary/30">
                <td className="px-4 py-3 font-medium text-foreground">{sale.id}</td>
                <td className="px-4 py-3 text-foreground">{sale.customer}</td>
                <td className="px-4 py-3 text-muted-foreground">{sale.items.join(", ")}</td>
                <td className="px-4 py-3 font-semibold gold-text">R$ {sale.total.toFixed(2)}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(sale.date).toLocaleDateString("pt-BR")}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{sale.paymentMethod}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-medium capitalize ${statusStyles[sale.status]}`}>
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
