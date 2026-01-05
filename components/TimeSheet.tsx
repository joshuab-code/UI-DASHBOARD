import React from 'react';
import { TIME_DATA } from '../constants';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Play, RotateCcw } from 'lucide-react';

export function TimeSheet() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
                <p className="text-muted-foreground mt-1">
                    Log hours daily. Flag rework explicitly for margin analysis.
                </p>
            </div>

            {/* Entry Form */}
            <Card className="bg-muted/10 border-dashed">
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-5 gap-4 items-end">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">Project</label>
                            <Select>
                                <option>Q1 Growth Sprint</option>
                                <option>Valentine Campaign</option>
                                <option>Internal</option>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Task</label>
                            <Input placeholder="e.g. Design V1" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Work Type</label>
                            <Select>
                                <option>Standard</option>
                                <option value="Rework">Rework (Fixes)</option>
                            </Select>
                        </div>
                        <Button className="w-full">
                            <Play className="mr-2 h-4 w-4" /> Start Timer
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Log Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Entries</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">User</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Project</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Task</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Type</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TIME_DATA.map(entry => (
                                    <tr key={entry.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle">{entry.date}</td>
                                        <td className="p-4 align-middle">{entry.user}</td>
                                        <td className="p-4 align-middle font-medium">{entry.project}</td>
                                        <td className="p-4 align-middle">{entry.task}</td>
                                        <td className="p-4 align-middle">
                                            {entry.workType === 'Rework' ? (
                                                <Badge variant="destructive" className="gap-1">
                                                    <RotateCcw className="h-3 w-3" /> Rework
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">Standard</Badge>
                                            )}
                                        </td>
                                        <td className="p-4 align-middle text-right font-mono">{entry.hours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
