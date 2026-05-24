import { useState, useMemo } from "react";
import { Search, Calendar, Plus, Trash2, ShoppingCart, Pencil, Ban } from "lucide-react";
import { sales as initialSales, products, customers, type Sale } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateReceiptPDF } from "@/lib/receipt";

const statusStyles = {
  "concluída": "bg-emerald-500/10 text-emerald-400",
  "pendente": "bg-yellow-500/10 text-yellow-400",
  "cancelada": "bg-red-500/10 text-red-400",
};

const paymentMethods = [
  "PIX",
  "Cartão Crédito",
  "Cartão Débito",
  "Dinheiro",
  "Boleto",
];

interface CartItem {
  productId: string;
  qty: number;
}

const Sales = () => {
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discount, setDiscount] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const { toast } = useToast();

  const filtered = sales.filter((s) =>
    s.customer.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
  );

  const availableProducts = products.filter((p) => p.stock > 0);

  const subtotal = useMemo(
    () =>
      cart.reduce((acc, item) => {
        const product = products.find((p) => p.id === item.productId);
        return acc + (product ? product.price * item.qty : 0);
      }, 0),
    [cart]
  );

  const discountValue = parseFloat(discount) || 0;
  const total = Math.max(0, subtotal - discountValue);

  const addProduct = () => {
    if (!selectedProductId) return;
    const exists = cart.find((c) => c.productId === selectedProductId);
    if (exists) {
      setCart(cart.map((c) =>
        c.productId === selectedProductId ? { ...c, qty: c.qty + 1 } : c
      ));
    } else {
      setCart([...cart, { productId: selectedProductId, qty: 1 }]);
    }
    setSelectedProductId("");
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCart(cart.filter((c) => c.productId !== productId));
      return;
    }
    setCart(cart.map((c) => (c.productId === productId ? { ...c, qty } : c)));
  };

  const removeItem = (productId: string) => {
    setCart(cart.filter((c) => c.productId !== productId));
  };

  const resetForm = () => {
    setCustomerId("");
    setPaymentMethod("");
    setDiscount("");
    setCart([]);
    setSelectedProductId("");
    setEditingId(null);
  };

  const openEdit = (sale: Sale) => {
    const customer = customers.find((c) => c.name === sale.customer);
    const cartItems: CartItem[] = sale.items
      .map((name) => {
        const p = products.find((p) => p.name === name);
        return p ? { productId: p.id, qty: 1 } : null;
      })
      .filter((x): x is CartItem => x !== null);
    setEditingId(sale.id);
    setCustomerId(customer?.id || "");
    setPaymentMethod(sale.paymentMethod);
    setDiscount("");
    setCart(cartItems);
    setSelectedProductId("");
    setIsModalOpen(true);
  };

  const confirmCancel = () => {
    if (!cancelTargetId) return;
    setSales((prev) =>
      prev.map((s) => (s.id === cancelTargetId ? { ...s, status: "cancelada" } : s))
    );
    toast({ title: "Venda cancelada", description: `${cancelTargetId} marcada como cancelada` });
    setCancelTargetId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || !paymentMethod || cart.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione cliente, forma de pagamento e ao menos um produto",
        variant: "destructive",
      });
      return;
    }
    const customer = customers.find((c) => c.id === customerId);
    const itemsDetailed = cart.map((c) => {
      const p = products.find((p) => p.id === c.productId)!;
      return { name: p.name, qty: c.qty, price: p.price };
    });

    if (editingId) {
      setSales((prev) =>
        prev.map((s) =>
          s.id === editingId
            ? {
                ...s,
                customer: customer?.name || s.customer,
                items: itemsDetailed.map((i) => i.name),
                total,
                paymentMethod,
              }
            : s
        )
      );
      toast({
        title: "Venda atualizada!",
        description: `${editingId} • R$ ${total.toFixed(2)}`,
      });
    } else {
      const saleId = `V${String(sales.length + 1).padStart(3, "0")}`;
      const newSale: Sale = {
        id: saleId,
        customer: customer?.name || "",
        items: itemsDetailed.map((i) => i.name),
        total,
        date: new Date().toISOString().slice(0, 10),
        status: "concluída",
        paymentMethod,
      };
      setSales((prev) => [newSale, ...prev]);
      generateReceiptPDF({
        saleId,
        customer: customer?.name || "",
        items: itemsDetailed,
        subtotal,
        discount: discountValue,
        total,
        paymentMethod,
        date: new Date(),
      });
      toast({
        title: "Venda registrada!",
        description: `${customer?.name} - R$ ${total.toFixed(2)} • Comprovante gerado`,
      });
    }
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Vendas</h1>
          <p className="text-sm text-muted-foreground">{sales.length} vendas registradas</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg gold-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Nova Venda
        </button>
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

      {/* Desktop table */}
      <div className="hidden md:block glass-card overflow-hidden rounded-xl">
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
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ações</th>
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
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(sale)}
                      disabled={sale.status === "cancelada"}
                      title="Editar"
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCancelTargetId(sale.id)}
                      disabled={sale.status === "cancelada"}
                      title="Cancelar"
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
                    >
                      <Ban className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((sale) => (
          <div key={sale.id} className="glass-card rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{sale.id}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize ${statusStyles[sale.status]}`}>
                {sale.status}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">{sale.customer}</p>
            <p className="text-xs text-muted-foreground">{sale.items.join(", ")}</p>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="font-heading text-base font-bold gold-text">R$ {sale.total.toFixed(2)}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(sale.date).toLocaleDateString("pt-BR")}
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground">{sale.paymentMethod}</p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => openEdit(sale)}
                disabled={sale.status === "cancelada"}
                className="h-8 gap-1.5"
              >
                <Pencil className="h-3.5 w-3.5" /> Editar
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setCancelTargetId(sale.id)}
                disabled={sale.status === "cancelada"}
                className="h-8 gap-1.5 hover:text-destructive hover:border-destructive/40"
              >
                <Ban className="h-3.5 w-3.5" /> Cancelar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Nova Venda */}
      <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) resetForm(); }}>
        <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" /> {editingId ? `Editar Venda ${editingId}` : "Nova Venda"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Cliente */}
            <div className="space-y-2">
              <Label>Cliente *</Label>
              <Select value={customerId} onValueChange={setCustomerId}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Adicionar Produto */}
            <div className="space-y-2">
              <Label>Adicionar Produto</Label>
              <div className="flex gap-2">
                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                  <SelectTrigger className="bg-secondary/50 flex-1">
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.image} {p.name} — R$ {p.price.toFixed(2)} ({p.stock} em estoque)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addProduct} disabled={!selectedProductId} className="gold-gradient font-semibold">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Carrinho */}
            {cart.length > 0 && (
              <div className="space-y-2">
                <Label>Itens da Venda</Label>
                <div className="rounded-lg border border-border bg-secondary/20 divide-y divide-border">
                  {cart.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    if (!product) return null;
                    const lineTotal = product.price * item.qty;
                    return (
                      <div key={item.productId} className="flex items-center gap-3 p-3">
                        <span className="text-2xl">{product.image}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">R$ {product.price.toFixed(2)} un.</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateQty(item.productId, item.qty - 1)}
                            className="h-7 w-7 rounded-md border border-border bg-card text-sm hover:border-primary/40"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.productId, Math.min(product.stock, item.qty + 1))}
                            className="h-7 w-7 rounded-md border border-border bg-card text-sm hover:border-primary/40"
                          >
                            +
                          </button>
                        </div>
                        <p className="w-24 text-right text-sm font-semibold gold-text">R$ {lineTotal.toFixed(2)}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pagamento e Desconto */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Forma de Pagamento *</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Desconto (R$)</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="bg-secondary/50"
                />
              </div>
            </div>

            {/* Totais */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">R$ {subtotal.toFixed(2)}</span>
              </div>
              {discountValue > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Desconto</span>
                  <span className="font-medium text-red-400">− R$ {discountValue.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-primary/20">
                <span className="font-heading text-sm font-semibold text-foreground">Total</span>
                <span className="font-heading text-xl font-bold gold-text">R$ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => { setIsModalOpen(false); resetForm(); }}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 gold-gradient font-semibold">
                {editingId ? "Salvar Alterações" : "Registrar Venda"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sales;
