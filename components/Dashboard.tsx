import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  DollarSign,
  Activity,
  AlertTriangle,
  Target,
  Clock,
  Briefcase,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ClientTable } from './ClientTable';
import { CreateClientDialog } from './CreateClientDialog';
import { INITIAL_CLIENTS, INITIAL_KPI_DATA, REVENUE_HISTORY, ROCKS_DATA } from '../constants';
import { formatCurrency, formatPercent } from '../lib/utils';
import { Client, KPIMetrics, RevenueData, Rock } from '../types';

export default function Dashboard() {
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  // Queries
  const { data: kpi } = useQuery<KPIMetrics>({
    queryKey: ['kpi'],
    queryFn: async () => INITIAL_KPI_DATA,
    staleTime: 1000 * 60 * 5,
  });

  const { data: clients, isLoading: clientsLoading } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => new Promise(resolve => setTimeout(() => resolve(INITIAL_CLIENTS), 600)),
  });

  const { data: revenue } = useQuery<RevenueData[]>({
    queryKey: ['revenue'],
    queryFn: async () => REVENUE_HISTORY,
  });

  const { data: rocks } = useQuery<Rock[]>({
    queryKey: ['rocks'],
    queryFn: async () => ROCKS_DATA,
  });

  const handleCreateSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-foreground text-background px-4 py-2 rounded-md shadow-lg flex items-center gap-2 animate-in slide-in-from-right-5">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          Client onboarded successfully
        </div>
      )}

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground/60 mt-1">
            Overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Target className="mr-2 h-4 w-4" />
            Scorecard
          </Button>
          <Button onClick={() => setIsCreateOpen(true)} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Client
          </Button>
        </div>
      </div>

      {/* 1. Executive Snapshot (Top Row) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 shadow-sm bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground/20" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tight">{formatCurrency(kpi?.pipelineValue || 0)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-emerald-500 font-medium">+{kpi?.newLeadsWeek}</span> new leads
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">Gross Margin</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground/20" />
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold tracking-tight ${(kpi?.grossMarginMonth || 0) < 40 ? 'text-destructive' : 'text-foreground'}`}>
              {kpi?.grossMarginMonth}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Target &gt;40%
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">At-Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground/20" />
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold tracking-tight ${(kpi?.atRiskClients || 0) > 0 ? 'text-destructive' : 'text-foreground'}`}>
              {kpi?.atRiskClients}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Needs attention
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">Utilization</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground/20" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tight">{kpi?.deliveryHoursWeek}h</div>
            <p className="text-xs text-muted-foreground mt-2">
              Capacity used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue/Margin Trend */}
        <Card className="col-span-4 border-border/50 shadow-sm bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Financial Performance</CardTitle>
            <CardDescription>Revenue vs. Gross Margin % over last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenue}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fff" stopOpacity={0.05} />
                      <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.1} />
                  <XAxis
                    dataKey="month"
                    stroke="#555"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#555"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#555"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 60]}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeOpacity={0.8}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="margin"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="none"
                  />
                  {/* Margin Threshold Line */}
                  <ReferenceLine y={40} yAxisId="right" stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Operational Health / Delivery */}
        <Card className="col-span-3 border-border/50 shadow-sm bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Execution Health</CardTitle>
            <CardDescription>Q1 Rocks & Capacity Alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Rocks Progress - SOP Section 9 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium flex items-center text-muted-foreground/80">
                    <Target className="mr-2 h-4 w-4 text-muted-foreground/50" /> Q1 Rocks Status
                  </span>
                  <span className="text-xs text-muted-foreground/50">Due 31 Mar 2026</span>
                </div>
                <div className="space-y-4">
                  {rocks?.map((rock) => (
                    <div key={rock.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium truncate max-w-[180px] text-foreground/90">{rock.title}</span>
                        <span className={
                          rock.status === 'Behind' ? 'text-destructive' :
                            rock.status === 'On Track' ? 'text-emerald-500' :
                              'text-muted-foreground'
                        }>{rock.status}</span>
                      </div>
                      <div className="h-1 w-full bg-secondary/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${rock.status === 'Behind' ? 'bg-destructive' : 'bg-primary'
                            }`}
                          style={{ width: `${rock.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border/20" />

              {/* Team Capacity Warning */}
              <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-4 flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-amber-500">Capacity Alert: Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    Utilization at 92%. Pause low-margin work immediately.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Client Management Table */}
      <Card className="border-border/50 shadow-sm bg-card/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Active Client Portfolio</CardTitle>
              <CardDescription>Monitor health, margin, and renewal risks.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-1 border-emerald-500/20 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Healthy: {(clients || []).filter(c => c.status === 'Green').length}
              </Badge>
              <Badge variant="outline" className="gap-1 border-amber-500/20 bg-amber-500/5 text-amber-500 hover:bg-amber-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Review: {(clients || []).filter(c => c.status === 'Amber').length}
              </Badge>
              <Badge variant="outline" className="gap-1 border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10">
                <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                At Risk: {(clients || []).filter(c => c.status === 'Red').length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ClientTable data={clients || []} isLoading={clientsLoading} />
        </CardContent>
      </Card>

      <CreateClientDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}