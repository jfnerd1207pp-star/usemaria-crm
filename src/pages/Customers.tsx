import { useState } from "react";
import { Search, Filter, Plus, Mail, Phone, Crown } from "lucide-react";
import { customers, Customer } from "@/data/mockData";

const statusStyles = {
  vip: "bg-primary/10 text-primary",
  ativo: "bg-emerald-500/10 text-emerald-400",
  inativo: "bg-muted text-muted-foreground",
};

const Customers = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");

  const filtered = customers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "todos" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-sm text-muted-foreground">{customers.length} clientes cadastrados</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg gold-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <Plus className="h-4 w-4" /> Novo Cliente
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["todos", "vip", "ativo", "inativo"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                filterStatus === status ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((customer, i) => (
          <CustomerCard key={customer.id} customer={customer} delay={i * 50} />
        ))}
      </div>
    </div>
  );
};

const CustomerCard = ({ customer, delay }: { customer: Customer; delay: number }) => (
  <div className="glass-card cursor-pointer rounded-xl p-5 transition-all duration-200 hover:border-primary/30" style={{ animationDelay: `${delay}ms` }}>
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 font-heading text-sm font-bold text-primary">
          {customer.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{customer.name}</p>
            {customer.status === "vip" && <Crown className="h-3.5 w-3.5 text-primary" />}
          </div>
          <span className={`inline-block mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${statusStyles[customer.status]}`}>
            {customer.status}
          </span>
        </div>
      </div>
    </div>

    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Mail className="h-3.5 w-3.5" /> {customer.email}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Phone className="h-3.5 w-3.5" /> {customer.phone}
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
      <div className="text-center">
        <p className="text-lg font-bold gold-text">R$ {customer.totalSpent.toLocaleString("pt-BR")}</p>
        <p className="text-[10px] text-muted-foreground">Total gasto</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-foreground">{customer.totalOrders}</p>
        <p className="text-[10px] text-muted-foreground">Pedidos</p>
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-foreground">{new Date(customer.lastPurchase).toLocaleDateString("pt-BR")}</p>
        <p className="text-[10px] text-muted-foreground">Última compra</p>
      </div>
    </div>
  </div>
);

export default Customers;
