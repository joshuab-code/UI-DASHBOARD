import React from 'react';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  KanbanSquare, 
  Clock, 
  Settings,
  PieChart,
  LogOut,
  Layers,
  FileText
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    currentPath?: string;
    onNavigate: (path: string) => void;
    className?: string;
}

export function Sidebar({ className, currentPath = 'dashboard', onNavigate }: SidebarProps) {
  const links = [
    { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    { name: 'Pipeline', icon: KanbanSquare, id: 'pipeline' },
    { name: 'Clients', icon: Users, id: 'clients' },
    { name: 'Projects', icon: Layers, id: 'projects' },
    { name: 'Time', icon: Clock, id: 'time' },
    { name: 'Offers', icon: FileText, id: 'offers' },
    { name: 'Reports', icon: PieChart, id: 'reports' },
  ];

  return (
    <div className={cn("pb-12 min-h-screen border-r bg-background w-64 hidden md:block fixed left-0 top-0 bottom-0", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">AS</div>
            Command Centre
          </h2>
          <p className="px-2 text-xs text-muted-foreground">Operations OS v1.0</p>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            {links.map((link) => (
               <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={cn(
                    "w-full justify-start flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    currentPath === link.id 
                        ? "bg-secondary text-secondary-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
               >
                 <link.icon className="h-4 w-4" />
                 {link.name}
               </button>
            ))}
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="absolute bottom-4 w-full px-3">
             <div className="space-y-1">
                <button className="w-full justify-start flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50">
                    <Settings className="h-4 w-4" />
                    Settings
                </button>
                <button className="w-full justify-start flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-destructive hover:bg-muted/50">
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
             </div>
             
             <div className="mt-4 px-3 py-2 bg-muted/20 rounded-md border border-border/40">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs">OD</div>
                    <div className="text-xs">
                        <p className="font-medium text-foreground">Ops Director</p>
                        <p className="text-muted-foreground">admin@affiliate.studio</p>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}
