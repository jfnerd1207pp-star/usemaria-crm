import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Lock, Store, CreditCard, Users } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">Gerencie preferências do sistema</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              <CardTitle>Informações da Loja</CardTitle>
            </div>
            <CardDescription>Dados básicos do estabelecimento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="store-name">Nome da Loja</Label>
              <Input id="store-name" defaultValue="Usemari" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="store-email">Email de Contato</Label>
              <Input id="store-email" type="email" defaultValue="contato@usemari.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="store-phone">Telefone</Label>
              <Input id="store-phone" defaultValue="(11) 99999-9999" />
            </div>
            <Button className="gold-gradient">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle>Métodos de Pagamento</CardTitle>
            </div>
            <CardDescription>Configure formas de pagamento aceitas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>PIX</Label>
                <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cartão de Crédito/Débito</Label>
                <p className="text-sm text-muted-foreground">Parcelamento disponível</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Boleto Bancário</Label>
                <p className="text-sm text-muted-foreground">Vencimento em 3 dias</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notificações</CardTitle>
            </div>
            <CardDescription>Configure alertas e avisos do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Novas Vendas</Label>
                <p className="text-sm text-muted-foreground">Receber notificação de vendas</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Estoque Baixo</Label>
                <p className="text-sm text-muted-foreground">Alertas de estoque</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Relatórios Semanais</Label>
                <p className="text-sm text-muted-foreground">Resumo de desempenho</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Níveis de Acesso</CardTitle>
            </div>
            <CardDescription>Gerencie permissões de usuários</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">Acesso total ao sistema</p>
              </div>
              <span className="text-sm text-muted-foreground">2 usuários</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Vendedor</p>
                <p className="text-xs text-muted-foreground">Vendas e clientes</p>
              </div>
              <span className="text-sm text-muted-foreground">5 usuários</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Estoquista</p>
                <p className="text-xs text-muted-foreground">Produtos e estoque</p>
              </div>
              <span className="text-sm text-muted-foreground">3 usuários</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Segurança</CardTitle>
            </div>
            <CardDescription>Configurações de proteção e auditoria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação 2FA</Label>
                <p className="text-sm text-muted-foreground">Verificação em duas etapas</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Logs de Atividade</Label>
                <p className="text-sm text-muted-foreground">Histórico de ações</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <Button variant="outline">Ver Logs de Auditoria</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
