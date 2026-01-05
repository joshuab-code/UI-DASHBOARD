import React from 'react';
import { OFFERS_DATA } from '../constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export function Offers() {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold tracking-tight">Offer Library (Q1)</h1>
                <p className="text-muted-foreground mt-1">
                    Authorized fixed-scope offers. No custom proposals outside these parameters.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                {OFFERS_DATA.map(offer => (
                    <Card key={offer.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl">{offer.name}</CardTitle>
                                    <CardDescription className="mt-2 text-base">
                                        {offer.description}
                                    </CardDescription>
                                </div>
                                <Badge variant="outline" className="text-lg px-3 py-1">
                                    {formatCurrency(offer.price)}+
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide text-muted-foreground">Inclusions (Locked)</h4>
                            <ul className="space-y-2">
                                {offer.inclusions.map((inc, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm">
                                        <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                                            <Check className="h-3 w-3" />
                                        </div>
                                        {inc}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="bg-muted/20 pt-6">
                            <Button className="w-full" variant="secondary">View SOP & Assets</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
