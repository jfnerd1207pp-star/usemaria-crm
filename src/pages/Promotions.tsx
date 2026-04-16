import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, TrendingUp, Tag } from "lucide-react";

const promotions = [
  { id: "1", name: "Black Friday 2026", discount: "40%", startDate: "2026-11-27", endDate: "2026-11-30", status: "agendada", products: 45 },
  { id: "2", name: "Verão 2026", discount: "25%", startDate: "2026-12-01", endDate: "2026-02-28", status: "ativa", products: 32 },
  { id: "3", name: "Liquidação Inverno", discount: "50%", startDate: "2026-06-01", endDate: "2026-07-31", status: "encerrada", products: 28 },
];

const Promotions = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Promoções</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie campanhas e descontos</p>
        </div>
        <Button className="gold-gradient">
          <Plus className="mr-2 h-4 w-4" />
          Nova Promoção
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promoções Ativas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">campanha em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos em Promoção</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground mt-1">itens com desconto</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">próximas campanhas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Promoções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {promotions.map((promo) => (
              <div key={promo.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{promo.name}</h3>
                    <Badge variant={promo.status === "ativa" ? "default" : promo.status === "agendada" ? "secondary" : "outline"}>
                      {promo.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {promo.startDate} até {promo.endDate} • {promo.products} produtos
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{promo.discount}</div>
                    <p className="text-xs text-muted-foreground">desconto</p>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Promotions;
