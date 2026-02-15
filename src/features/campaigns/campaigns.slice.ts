import { createSlice } from '@reduxjs/toolkit'
import type { Campaign } from './campaigns.types'
import {
  fetchCampaigns,
  addCampaign,
  editCampaign,
  removeCampaign
} from './campaigns.thunk'

interface CampaignState {
  campaigns: Campaign[]
  loading: boolean
  error: string | null
}

const initialState: CampaignState = {
  campaigns: [],
  loading: false,
  error: null
}

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {},
  extraReducers: builder => {

    /* ---------------- FETCH ---------------- */

    builder
      .addCase(fetchCampaigns.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false
        state.campaigns = action.payload
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch campaigns'
      })

    /* ---------------- CREATE ---------------- */

    builder
      .addCase(addCampaign.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(addCampaign.fulfilled, (state, action) => {
        state.loading = false
        state.campaigns.push(action.payload)
      })
      .addCase(addCampaign.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to add campaign'
      })

    /* ---------------- UPDATE ---------------- */

    builder
      .addCase(editCampaign.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(editCampaign.fulfilled, (state, action) => {
        state.loading = false

        const index = state.campaigns.findIndex(
          c => c.id === action.payload.id
        )

        if (index !== -1) {
          state.campaigns[index] = action.payload
        }
      })
      .addCase(editCampaign.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to update campaign'
      })

    /* ---------------- DELETE ---------------- */

    builder
      .addCase(removeCampaign.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(removeCampaign.fulfilled, (state, action) => {
        state.loading = false
        state.campaigns = state.campaigns.filter(
          c => c.id !== action.payload
        )
      })
      .addCase(removeCampaign.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to delete campaign'
      })
  }
})

export default campaignsSlice.reducer
