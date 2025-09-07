export interface Report {
  id: string;
  type: 'help-needed' | 'medical' | 'safe-zone' | 'resources' | 'volunteer';
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'resolved' | 'verified';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reportedBy?: string;
  contact?: string;
  resourceType?: string;
  capacity?: number;
  verified: boolean;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  area?: {
    center: { lat: number; lng: number };
    radius: number;
  };
  location?: { lat: number; lng: number };
  createdAt: Date;
  expiresAt?: Date;
  active: boolean;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  role: 'user' | 'volunteer' | 'admin';
  location?: { lat: number; lng: number };
  verified: boolean;
}

export type FilterType = 'all' | 'help-needed' | 'medical' | 'safe-zone' | 'resources' | 'volunteer';