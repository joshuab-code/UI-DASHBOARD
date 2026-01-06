import React from 'react';
import { PROJECTS_DATA } from '../constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Plus, MoreHorizontal } from 'lucide-react';

export function Projects() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Active Projects</h1>
                    <p className="text-muted-foreground mt-1">
                        Track delivery progress, budget adherence, and status.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
            </div>

            <div className="grid gap-6">
                {PROJECTS_DATA.map(project => (
                    <Card key={project.id}>
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <CardTitle>{project.name}</CardTitle>
                                        <Badge variant={
                                            project.status === 'Active' ? 'success' : 
                                            project.status === 'Blocked' ? 'destructive' : 'secondary'
                                        }>
                                            {project.status}
                                        </Badge>
                                    </div>
                                    <CardDescription className="mt-1">{project.clientName} • {project.offer}</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Timeline Progress</span>
                                        <span className="font-medium">{project.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary transition-all" 
                                            style={{ width: `${project.progress}%` }} 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Hours Budget</span>
                                        <span className="font-mono text-xs">{project.hoursUsed} / {project.hoursBudget} hrs</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full transition-all ${project.hoursUsed / project.hoursBudget > 0.8 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                            style={{ width: `${(project.hoursUsed / project.hoursBudget) * 100}%` }} 
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end">
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">Due Date</p>
                                        <p className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
