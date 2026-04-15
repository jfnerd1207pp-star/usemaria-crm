import { useState } from "react";
import { Search, Plus, Package } from "lucide-react";
import { products, Product } from "@/data/mockData";

const stockStyles = {
  "disponível": "bg-emerald-500/10 text-emerald-400",
  "baixo estoque": "bg-yellow-500/10 text-yellow-400",
  "esgotado": "bg-red-500/10 text-red-400",
};

const Products = () => {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Produtos</h1>
          <p className="text-sm text-muted-foreground">{products.length} produtos no catálogo</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg gold-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <Plus className="h-4 w-4" /> Novo Produto
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar produto ou categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-card px-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i * 50} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, delay }: { product: Product; delay: number }) => (
  <div className="glass-card cursor-pointer rounded-xl overflow-hidden transition-all duration-200 hover:border-primary/30 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
    <div className="flex h-32 items-center justify-center bg-secondary/50 text-5xl">
      {product.image}
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{product.name}</p>
          <p className="text-xs text-muted-foreground">{product.category}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="font-heading text-lg font-bold gold-text">R$ {product.price.toFixed(2)}</p>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${stockStyles[product.status]}`}>
          {product.status}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Package className="h-3.5 w-3.5" /> {product.stock} em estoque
      </div>
    </div>
  </div>
);

export default Products;
