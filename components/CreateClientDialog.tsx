import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { HealthStatus, OfferType } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Client name must be at least 2 characters"),
  offer: z.nativeEnum(OfferType),
  mrr: z.coerce.number().min(1000, "Minimum MRR is 1000"),
  status: z.nativeEnum(HealthStatus),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateClientDialog({ open, onOpenChange, onSuccess }: CreateClientDialogProps) {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange', // Real-time validation for trust
    defaultValues: {
      name: '',
      offer: OfferType.LocalGrowth,
      mrr: 2500,
      status: HealthStatus.Green,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsPending(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Optimistic Update Simulation
    queryClient.setQueryData(['clients'], (old: any) => {
      const newClient = {
        id: Math.random().toString(),
        ...data,
        margin: 45, // default margin for new
        renewalDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        lastActivity: new Date().toISOString(),
      };
      return [...(old || []), newClient];
    });

    setIsPending(false);
    reset();
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Onboard New Client</DialogTitle>
        <DialogDescription>
          Add a new client to the command centre. Ensure contract is signed.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Client Name
          </label>
          <Input {...register('name')} placeholder="Acme Corp" />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Offer Type</label>
          <Select {...register('offer')}>
            <option value={OfferType.LocalGrowth}>{OfferType.LocalGrowth}</option>
            <option value={OfferType.VenueHospitality}>{OfferType.VenueHospitality}</option>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">MRR ($)</label>
            <Input type="number" {...register('mrr')} />
            {errors.mrr && <p className="text-xs text-destructive">{errors.mrr.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Initial Status</label>
            <Select {...register('status')}>
              <option value={HealthStatus.Green}>Green</option>
              <option value={HealthStatus.Amber}>Amber</option>
              <option value={HealthStatus.Red}>Red</option>
            </Select>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Create Client'}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}