import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface ExchangeState {
  usdToInr: number
  loading: boolean
}

const initialState: ExchangeState = {
  usdToInr: 83,
  loading: false
}

export const fetchExchangeRate = createAsyncThunk(
  'exchange/fetch',
  async () => {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/34fa469997a8171aaa99929d/latest/USD`
    )

    const data = await res.json()
    return data.conversion_rates?.INR
  }
)

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchExchangeRate.pending, state => {
        state.loading = true
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.loading = false
        state.usdToInr = action.payload
      })
  }
})

export default exchangeSlice.reducer