import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { Pipeline } from './components/Pipeline';
import { Projects } from './components/Projects';
import { TimeSheet } from './components/TimeSheet';
import { Offers } from './components/Offers';
import { Scorecard } from './components/Scorecard';
import { ClientsView } from './components/ClientsView';

// Initialize React Query Client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
      switch(currentView) {
          case 'dashboard': return <Dashboard />;
          case 'pipeline': return <Pipeline />;
          case 'projects': return <Projects />;
          case 'time': return <TimeSheet />;
          case 'offers': return <Offers />;
          case 'reports': return <Scorecard />;
          case 'clients': return <ClientsView />;
          default: return <Dashboard />;
      }
  };

  return (
    <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background font-sans antialiased text-foreground flex">
            {/* Sidebar (Desktop) */}
            <Sidebar 
                currentPath={currentView} 
                onNavigate={setCurrentView}
                className="z-20"
            />

            {/* Main Content Area */}
            <main className="flex-1 md:pl-64 min-h-screen flex flex-col">
                <div className="flex-1 p-8 pt-6">
                     <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {renderView()}
                     </div>
                </div>
            </main>
        </div>
    </QueryClientProvider>
  );
}
