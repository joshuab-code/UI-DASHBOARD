import { Client, Deal, HealthStatus, KPIMetrics, Offer, OfferType, PipelineStage, Project, RevenueData, Rock, TimeEntry } from './types';

export const INITIAL_KPI_DATA: KPIMetrics = {
  pipelineValue: 145000,
  newLeadsWeek: 12,
  qualifiedRate: 42,
  winRate: 28,
  grossMarginMonth: 44, // Target > 40%
  deliveryHoursWeek: 142,
  atRiskClients: 2,
  rocksOnTrack: 85,
};

// SOP Section 9.1 Q1 Rocks
export const ROCKS_DATA: Rock[] = [
  { id: '1', title: 'Profitability & Margin Systems', owner: 'Finance', status: 'On Track', progress: 85 },
  { id: '2', title: 'Two Fixed-Scope Offers Productised', owner: 'Product', status: 'Complete', progress: 100 },
  { id: '3', title: 'Core Delivery Systems Documented', owner: 'Ops', status: 'Behind', progress: 45 },
  { id: '4', title: 'Gartland Ringfenced (Capacity)', owner: 'Ops', status: 'On Track', progress: 95 },
  { id: '5', title: 'Weekly Leadership OS Running', owner: 'Leadership', status: 'On Track', progress: 100 },
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Apex Fitness',
    offer: OfferType.LocalGrowth,
    status: HealthStatus.Green,
    mrr: 2500,
    renewalDate: '2026-03-15',
    lastActivity: '2026-01-20',
    margin: 48
  },
  {
    id: '2',
    name: 'Bistro 42',
    offer: OfferType.VenueHospitality,
    status: HealthStatus.Amber,
    mrr: 3200,
    renewalDate: '2026-02-01',
    lastActivity: '2026-01-18',
    margin: 35
  },
  {
    id: '3',
    name: 'TechFlow Systems',
    offer: OfferType.LocalGrowth,
    status: HealthStatus.Red,
    mrr: 5000,
    renewalDate: '2026-01-28',
    lastActivity: '2026-01-10',
    margin: 22
  },
  {
    id: '4',
    name: 'Urban Spas',
    offer: OfferType.LocalGrowth,
    status: HealthStatus.Green,
    mrr: 2500,
    renewalDate: '2026-04-10',
    lastActivity: '2026-01-21',
    margin: 52
  },
  {
    id: '5',
    name: 'The Grand Hotel',
    offer: OfferType.VenueHospitality,
    status: HealthStatus.Green,
    mrr: 4500,
    renewalDate: '2026-03-01',
    lastActivity: '2026-01-19',
    margin: 41
  },
];

export const REVENUE_HISTORY: RevenueData[] = [
  { month: 'Aug', revenue: 45000, margin: 38 },
  { month: 'Sep', revenue: 52000, margin: 39 },
  { month: 'Oct', revenue: 49000, margin: 41 },
  { month: 'Nov', revenue: 58000, margin: 43 },
  { month: 'Dec', revenue: 62000, margin: 40 },
  { month: 'Jan', revenue: 68000, margin: 44 },
];

// --- New Data ---

export const PIPELINE_DATA: Deal[] = [
  { id: '1', clientName: 'Summit Law', value: 3500, stage: 'Qualified', owner: 'Sarah', nextStep: 'Discovery Call', expectedClose: '2026-02-15' },
  { id: '2', clientName: 'Green Earth Cafe', value: 2500, stage: 'Incoming Lead', owner: 'Mike', nextStep: 'Initial Outreach', expectedClose: '2026-02-20' },
  { id: '3', clientName: 'Nexus Tech', value: 5000, stage: 'Negotiation', owner: 'Sarah', nextStep: 'Contract Review', expectedClose: '2026-01-30' },
  { id: '4', clientName: 'Blue Ocean', value: 3000, stage: 'Proposal Sent', owner: 'Mike', nextStep: 'Follow up', expectedClose: '2026-02-05' },
  { id: '5', clientName: 'City Gym', value: 2500, stage: 'Discovery Done', owner: 'Sarah', nextStep: 'Draft Proposal', expectedClose: '2026-02-10' },
];

export const PROJECTS_DATA: Project[] = [
  { id: '1', name: 'Q1 Growth Sprint', clientName: 'Apex Fitness', offer: OfferType.LocalGrowth, status: 'Active', dueDate: '2026-03-01', hoursUsed: 12, hoursBudget: 40, progress: 30 },
  { id: '2', name: 'Valentine Campaign', clientName: 'Bistro 42', offer: OfferType.VenueHospitality, status: 'Active', dueDate: '2026-02-14', hoursUsed: 18, hoursBudget: 25, progress: 72 },
  { id: '3', name: 'Website Overhaul', clientName: 'TechFlow Systems', offer: OfferType.LocalGrowth, status: 'Blocked', dueDate: '2026-02-28', hoursUsed: 35, hoursBudget: 40, progress: 85 },
];

export const TIME_DATA: TimeEntry[] = [
  { id: '1', project: 'Q1 Growth Sprint', task: 'Ad Creative', hours: 2.5, workType: 'Standard', date: '2026-01-24', user: 'Designer' },
  { id: '2', project: 'Valentine Campaign', task: 'Copy Revisions', hours: 1.0, workType: 'Rework', date: '2026-01-24', user: 'Copywriter' },
  { id: '3', project: 'Website Overhaul', task: 'Dev Fixes', hours: 4.0, workType: 'Standard', date: '2026-01-23', user: 'Developer' },
];

export const OFFERS_DATA: Offer[] = [
  { 
    id: '1', 
    name: 'Local Growth Engine', 
    price: 2500, 
    description: 'Turnkey lead generation for service businesses.', 
    inclusions: ['Meta Ads Setup', 'Landing Page', 'CRM Integration', 'Weekly Reporting'] 
  },
  { 
    id: '2', 
    name: 'Venue & Hospitality Campaign', 
    price: 3500, 
    description: 'Event-driven marketing for restaurants and venues.', 
    inclusions: ['Event Strategy', 'Social Content (4 posts)', 'Email Sequence', 'Influencer Outreach'] 
  },
];
