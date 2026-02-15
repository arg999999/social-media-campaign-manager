import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from './app/store'


import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import MainLayout from './layout/MainLayout'
import { fetchCampaigns } from './features/campaigns/campaigns.thunk'
import { fetchExchangeRate } from './features/exchange/exchange.slice'


const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCampaigns())
    dispatch(fetchExchangeRate())
  }, [dispatch])

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
      </Routes>
    </MainLayout>
  )
}

export default App
