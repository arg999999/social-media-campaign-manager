export interface DashboardStats {
  totalCampaigns: number
  totalBudget: number
  totalEngagement: number
  statusCount: {
    draft: number
    scheduled: number
    published: number
  }
  platformCount: {
    Instagram: number
    Facebook: number
    LinkedIn: number
  }
}
