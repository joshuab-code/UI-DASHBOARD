import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ClientTable } from './ClientTable';
import { INITIAL_CLIENTS } from '../constants';
import { Client } from '../types';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { CreateClientDialog } from './CreateClientDialog';

export function ClientsView() {
    const [isCreateOpen, setIsCreateOpen] = React.useState(false);

    const { data: clients, isLoading } = useQuery<Client[]>({
        queryKey: ['clients'],
        queryFn: async () => new Promise(resolve => setTimeout(() => resolve(INITIAL_CLIENTS), 600)),
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                    <p className="text-muted-foreground mt-1">
                        Active portfolio health check.
                    </p>
                </div>
                <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> New Client
                </Button>
            </div>

            <div className="rounded-lg border bg-card p-6">
                 <ClientTable data={clients || []} isLoading={isLoading} />
            </div>

             <CreateClientDialog 
                open={isCreateOpen} 
                onOpenChange={setIsCreateOpen}
                onSuccess={() => {}}
            />
        </div>
    )
}
