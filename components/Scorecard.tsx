import React from 'react';
import { INITIAL_KPI_DATA, ROCKS_DATA } from '../constants';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function Scorecard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Scorecard & Reports</h1>
                <p className="text-muted-foreground mt-1">
                    Weekly leadership review (Mondays). Trends and execution status.
                </p>
            </div>

            {/* Rocks Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Q1 Rocks (Objectives)</CardTitle>
                </CardHeader>
                <CardContent>
                    <table className="w-full caption-bottom text-sm text-left">
                         <thead className="[&_tr]:border-b">
                            <tr className="border-b">
                                <th className="h-12 px-4 font-medium text-muted-foreground">Rock</th>
                                <th className="h-12 px-4 font-medium text-muted-foreground">Owner</th>
                                <th className="h-12 px-4 font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 font-medium text-muted-foreground w-[200px]">Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ROCKS_DATA.map(rock => (
                                <tr key={rock.id} className="border-b last:border-0 hover:bg-muted/50">
                                    <td className="p-4 font-medium">{rock.title}</td>
                                    <td className="p-4">{rock.owner}</td>
                                    <td className="p-4">
                                        <Badge variant={
                                            rock.status === 'On Track' || rock.status === 'Complete' ? 'success' :
                                            rock.status === 'Behind' ? 'warning' : 'destructive'
                                        }>
                                            {rock.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-primary" 
                                                    style={{ width: `${rock.progress}%` }} 
                                                />
                                            </div>
                                            <span className="text-xs font-mono">{rock.progress}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            {/* Detailed Metrics Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Sales Metrics</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex justify-between items-center py-2 border-b">
                             <span>New Leads (Weekly)</span>
                             <span className="font-mono font-bold">{INITIAL_KPI_DATA.newLeadsWeek}</span>
                         </div>
                         <div className="flex justify-between items-center py-2 border-b">
                             <span>Qualified Rate</span>
                             <span className="font-mono font-bold">{INITIAL_KPI_DATA.qualifiedRate}%</span>
                         </div>
                         <div className="flex justify-between items-center py-2 border-b">
                             <span>Win Rate</span>
                             <span className="font-mono font-bold">{INITIAL_KPI_DATA.winRate}%</span>
                         </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Delivery Metrics</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex justify-between items-center py-2 border-b">
                             <span>Gross Margin (Month)</span>
                             <span className="font-mono font-bold text-emerald-500">{INITIAL_KPI_DATA.grossMarginMonth}%</span>
                         </div>
                         <div className="flex justify-between items-center py-2 border-b">
                             <span>Delivery Hours</span>
                             <span className="font-mono font-bold">{INITIAL_KPI_DATA.deliveryHoursWeek} hrs</span>
                         </div>
                         <div className="flex justify-between items-center py-2 border-b">
                             <span>At-Risk Clients</span>
                             <span className="font-mono font-bold text-destructive">{INITIAL_KPI_DATA.atRiskClients}</span>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
