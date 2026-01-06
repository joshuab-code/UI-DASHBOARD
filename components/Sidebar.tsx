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
    <div className={cn("pb-12 min-h-screen bg-muted/5 w-64 hidden md:block fixed left-0 top-0 bottom-0", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight text-foreground/90 flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-foreground text-background flex items-center justify-center text-xs font-bold">AS</div>
            Command Centre
          </h2>
          <p className="px-2 text-xs text-muted-foreground/60">Operations OS v1.0</p>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={cn(
                  "w-full justify-start flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  currentPath === link.id
                    ? "bg-secondary/50 text-foreground"
                    : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/30"
                )}
              >
                <link.icon className={cn("h-4 w-4", currentPath === link.id ? "opacity-100" : "opacity-70")} />
                {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Section - Utilities moved down to reduce focus */}
        <div className="absolute bottom-6 w-full px-3">
          <div className="space-y-1 mb-6">
            <p className="px-3 text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest mb-2">Utilities</p>
            <button className="w-full justify-start flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/30">
              <Settings className="h-4 w-4 opacity-70" />
              Settings
            </button>
            <button className="w-full justify-start flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground/60 hover:text-destructive hover:bg-muted/30">
              <LogOut className="h-4 w-4 opacity-70" />
              Logout
            </button>
          </div>

          {/* Profile - "Bleeds" into background */}
          <div className="px-3 py-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">OD</div>
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
