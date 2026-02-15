import { createAsyncThunk } from '@reduxjs/toolkit'
import { campaignService } from './campaigns.services'
import type { Campaign } from './campaigns.types'

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetch',
  async () => {
    return await campaignService.getAll()
  }
)

export const addCampaign = createAsyncThunk(
  'campaigns/add',
  async (data: Campaign) => {
    return await campaignService.create(data)
  }
)

export const editCampaign = createAsyncThunk(
  'campaigns/edit',
  async (data: Partial<Campaign> & { id: string }) => {
    return await campaignService.update(data)
  }
)

export const removeCampaign = createAsyncThunk(
  'campaigns/remove',
  async (id: string) => {
    return await campaignService.remove(id)
  }
)
