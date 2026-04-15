import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import AppSidebar from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {isMobile ? (
        <>
          <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-sidebar px-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-sidebar-accent">
                  <Menu className="h-5 w-5 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-sidebar border-r border-border">
                <AppSidebar onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <h1 className="font-heading text-sm font-semibold text-foreground">Usemari</h1>
          </header>
          <main className="min-h-[calc(100vh-3.5rem)] p-4">
            {children}
          </main>
        </>
      ) : (
        <>
          <AppSidebar />
          <main className="ml-64 min-h-screen p-6">
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default AppLayout;
