import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Receipt,
  Tags,
  Settings,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Clientes", path: "/clientes" },
  { icon: ShoppingBag, label: "Produtos", path: "/produtos" },
  { icon: Receipt, label: "Vendas", path: "/vendas" },
  { icon: Tags, label: "Promoções", path: "/promocoes" },
  { icon: TrendingUp, label: "Relatórios", path: "/relatorios" },
  { icon: Settings, label: "Configurações", path: "/configuracoes" },
];

interface AppSidebarProps {
  onNavigate?: () => void;
}

const AppSidebar = ({ onNavigate }: AppSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <aside className="flex h-screen w-64 flex-col md:fixed md:left-0 md:top-0 md:z-40 md:border-r md:border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg gold-gradient">
          <ShoppingBag className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-heading text-sm font-semibold text-foreground">Usemari</h1>
          <p className="text-[10px] text-muted-foreground">Gestão da Loja</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
            AL
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">Admin Loja</p>
            <p className="text-[10px] text-muted-foreground">admin@fashioncrm.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
