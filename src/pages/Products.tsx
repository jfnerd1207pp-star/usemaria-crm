import { useState } from "react";
import { Search, Plus, Package, X, Upload } from "lucide-react";
import { products, Product } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const stockStyles = {
  "disponível": "bg-emerald-500/10 text-emerald-400",
  "baixo estoque": "bg-yellow-500/10 text-yellow-400",
  "esgotado": "bg-red-500/10 text-red-400",
};

const categories = ["Vestuário", "Acessórios", "Calçados"];
const sizes = ["PP", "P", "M", "G", "GG", "XG"];
const colors = [
  { name: "Preto", hex: "#0a0a0a" },
  { name: "Branco", hex: "#f5f5f5" },
  { name: "Azul", hex: "#3b82f6" },
  { name: "Vermelho", hex: "#ef4444" },
  { name: "Bege", hex: "#d4a574" },
  { name: "Marrom", hex: "#8b5e3c" },
  { name: "Verde", hex: "#22c55e" },
  { name: "Rosa", hex: "#ec4899" },
];

const Products = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    selectedSizes: [] as string[],
    selectedColors: [] as string[],
  });
  const { toast } = useToast();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter((s) => s !== size)
        : [...prev.selectedSizes, size],
    }));
  };

  const toggleColor = (colorName: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(colorName)
        ? prev.selectedColors.filter((c) => c !== colorName)
        : [...prev.selectedColors, colorName],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price) {
      toast({ title: "Erro", description: "Preencha os campos obrigatórios", variant: "destructive" });
      return;
    }
    toast({ title: "Produto cadastrado!", description: `${formData.name} foi adicionado ao catálogo` });
    setFormData({ name: "", category: "", price: "", stock: "", selectedSizes: [], selectedColors: [] });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Produtos</h1>
          <p className="text-sm text-muted-foreground">{products.length} produtos no catálogo</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg gold-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
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

      {/* Modal Cadastro de Produto */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="glass-card max-w-lg max-h-[90vh] overflow-y-auto border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">Novo Produto</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Upload de Foto */}
            <div className="space-y-2">
              <Label>Foto do Produto</Label>
              <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 transition-colors hover:border-primary/40">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="h-6 w-6" />
                  <span className="text-xs">Clique para enviar foto</span>
                </div>
              </div>
            </div>

            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="prod-name">Nome *</Label>
              <Input
                id="prod-name"
                placeholder="Ex: Trench Coat Classic"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-secondary/50"
              />
            </div>

            {/* Categoria e Preço */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria *</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prod-price">Preço (R$) *</Label>
                <Input
                  id="prod-price"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-secondary/50"
                />
              </div>
            </div>

            {/* Estoque */}
            <div className="space-y-2">
              <Label htmlFor="prod-stock">Estoque Inicial</Label>
              <Input
                id="prod-stock"
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="bg-secondary/50"
              />
            </div>

            {/* Tamanhos */}
            <div className="space-y-2">
              <Label>Tamanhos Disponíveis</Label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      formData.selectedSizes.includes(size)
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cores */}
            <div className="space-y-2">
              <Label>Cores Disponíveis</Label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    type="button"
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      formData.selectedColors.includes(color.name)
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 gold-gradient font-semibold">
                Cadastrar Produto
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
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
