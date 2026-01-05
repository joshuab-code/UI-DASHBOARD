import React from 'react';
import { PIPELINE_DATA } from '../constants';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { formatCurrency } from '../lib/utils';
import { PipelineStage } from '../types';

const STAGES: PipelineStage[] = [
    'Incoming Lead', 
    'Qualified', 
    'Discovery Booked', 
    'Proposal Sent', 
    'Negotiation', 
    'Closed Won'
];

export function Pipeline() {
    return (
        <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Pipeline</h1>
                <p className="text-muted-foreground mt-1">
                    Manage deals from lead to close. Gate: Signed PDF required for Closed Won.
                </p>
            </div>
            
            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-[1200px] h-full">
                    {STAGES.map(stage => {
                        const deals = PIPELINE_DATA.filter(d => d.stage === stage);
                        const totalValue = deals.reduce((acc, curr) => acc + curr.value, 0);
                        
                        return (
                            <div key={stage} className="w-[280px] flex-shrink-0 flex flex-col gap-3">
                                <div className="flex items-center justify-between px-1">
                                    <span className="font-medium text-sm">{stage}</span>
                                    <span className="text-xs text-muted-foreground">{deals.length}</span>
                                </div>
                                <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                                     <div className="h-full bg-primary/20 w-full" />
                                </div>
                                <div className="text-xs text-muted-foreground px-1 font-mono">
                                    {formatCurrency(totalValue)}
                                </div>

                                <div className="flex flex-col gap-3 overflow-y-auto">
                                    {deals.map(deal => (
                                        <Card key={deal.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                                            <CardContent className="p-4 space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <span className="font-semibold text-sm">{deal.clientName}</span>
                                                    <Badge variant="outline" className="text-[10px] h-5 px-1">{formatCurrency(deal.value)}</Badge>
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Owner: {deal.owner}
                                                </div>
                                                <div className="pt-2 border-t border-border/40 mt-2">
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Next Step</p>
                                                    <p className="text-xs font-medium">{deal.nextStep}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    {deals.length === 0 && (
                                        <div className="h-24 rounded-lg border border-dashed border-border/60 flex items-center justify-center">
                                            <span className="text-xs text-muted-foreground">Empty</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
