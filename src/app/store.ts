import { configureStore } from '@reduxjs/toolkit'
import campaignsReducer from '../features/campaigns/campaigns.slice'
import exchangeReducer from '../features/exchange/exchange.slice'

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
     exchange: exchangeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
