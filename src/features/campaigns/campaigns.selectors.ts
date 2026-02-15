import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { DashboardStats } from '../../pages/Dashboard/dashboard.types'


export const selectCampaignState = (state: RootState) =>
  state.campaigns

export const selectAllCampaigns = (state: RootState) =>
  state.campaigns.campaigns

export const selectCampaignLoading = (state: RootState) =>
  state.campaigns.loading

export const selectDashboardStats = createSelector(
  [selectAllCampaigns],
  (campaigns): DashboardStats => ({
    totalCampaigns: campaigns.length,

    totalBudget: campaigns.reduce(
      (acc, c) => acc + Number(c.budget),
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
  })
)
