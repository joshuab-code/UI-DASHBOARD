export enum HealthStatus {
  Green = 'Green',
  Amber = 'Amber',
  Red = 'Red'
}

export enum OfferType {
  LocalGrowth = 'Local Growth Engine',
  VenueHospitality = 'Venue & Hospitality Campaign'
}

export interface Client {
  id: string;
  name: string;
  offer: OfferType;
  status: HealthStatus;
  mrr: number;
  renewalDate: string; // ISO date
  lastActivity: string; // ISO date
  margin: number; // Percentage
}

export interface Rock {
  id: string;
  title: string;
  owner: string;
  status: 'On Track' | 'Behind' | 'At Risk' | 'Complete';
  progress: number;
}

export interface KPIMetrics {
  pipelineValue: number;
  newLeadsWeek: number;
  qualifiedRate: number;
  winRate: number;
  grossMarginMonth: number;
  deliveryHoursWeek: number;
  atRiskClients: number;
  rocksOnTrack: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  margin: number;
}

// --- New Types for Tabs ---

export type PipelineStage = 
  | 'Incoming Lead' 
  | 'Qualified' 
  | 'Discovery Booked' 
  | 'Discovery Done' 
  | 'Proposal Sent' 
  | 'Negotiation' 
  | 'Closed Won' 
  | 'Closed Lost' 
  | 'Nurture' 
  | 'Disqualified';

export interface Deal {
  id: string;
  clientName: string;
  value: number;
  stage: PipelineStage;
  owner: string;
  nextStep: string;
  expectedClose: string;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  offer: OfferType;
  status: 'Draft' | 'Active' | 'Blocked' | 'Completed';
  dueDate: string;
  hoursUsed: number;
  hoursBudget: number;
  progress: number;
}

export interface TimeEntry {
  id: string;
  project: string;
  task: string;
  hours: number;
  workType: 'Standard' | 'Rework';
  date: string;
  user: string;
}

export interface Offer {
  id: string;
  name: string;
  price: number;
  description: string;
  inclusions: string[];
}
