import type { Campaign } from '../../features/campaigns/campaigns.types';
import type { DashboardStats } from './dashboard.types';

export const calculateDashboardStats = (
  campaigns: Campaign[]
): DashboardStats => {
  return {
    totalCampaigns: campaigns.length,

    totalBudget: campaigns.reduce(
      (acc, c) => acc + c.budget,
      0
    ),

    totalEngagement: campaigns.reduce(
      (acc, c) => acc + (c.likes ?? 0) + (c.comments ?? 0),
      0
    ),

    statusCount: {
      draft: campaigns.filter(c => c.status === 'draft').length,
      scheduled: campaigns.filter(c => c.status === 'scheduled').length,
      published: campaigns.filter(c => c.status === 'published').length
    },

    platformCount: {
      Instagram: campaigns.filter(c => c.platform === 'Instagram').length,
      Facebook: campaigns.filter(c => c.platform === 'Facebook').length,
      LinkedIn: campaigns.filter(c => c.platform === 'LinkedIn').length
    }
  };
};
