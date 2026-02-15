import { api } from '../../app/api'
import type { Campaign } from './campaigns.types'

export const campaignService = {
  getAll: async () => {
    const { data } = await api.get('/campaigns/')
    return data.results ?? data;
  },

  create: async (payload: Campaign) => {
    const { data } = await api.post('/campaigns/', payload)
    return data
  },

  update: async (payload: Partial<Campaign> & { id: string }) => {
    const { data } = await api.patch(
      `/campaigns/${payload.id}/`,
      payload
    )
    return data
  },


  remove: async (id: string) => {
    await api.delete(`/campaigns/${id}/`)
    return id
  }
}


