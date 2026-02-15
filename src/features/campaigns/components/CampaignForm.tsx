import {
  TextField,
  MenuItem,
  Typography,
  Box,
  Stack
} from '@mui/material'
import type { Campaign, Platform, Status } from '../campaigns.types'
import { useState, useEffect } from 'react'


interface CampaignFormProps {
  values?: Partial<Campaign>
  onChange?: (values: Partial<Campaign>) => void
  usdToInr?: number
}

const platforms: Platform[] = ['Instagram', 'Facebook', 'LinkedIn']
const statuses: Status[] = ['draft', 'scheduled', 'published']


const CampaignForm = ({ values = {}, onChange, usdToInr = 83 }: CampaignFormProps) => {
  const [formData, setFormData] = useState<Partial<Campaign>>({
    title: '',
    platform: 'Instagram',
    status: 'draft',
    budget: 0,
    start_date: '',
    end_date: '',
    ...values
  })

  useEffect(() => {
    onChange?.(formData)
  }, [formData])

  const handleChange = (field: keyof Campaign, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  return (
    <Box>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Campaign Name"
          value={formData.title ?? ''}
          onChange={(e) => handleChange('title', e.target.value)}
        />

        <TextField
          select
          fullWidth
          label="Platform"
          value={formData.platform ?? 'Instagram'}
          onChange={(e) => handleChange('platform', e.target.value)}
        >
          {platforms.map((platform) => (
            <MenuItem key={platform} value={platform}>
              {platform}
            </MenuItem>
          ))}
        </TextField>

        <Box>
          <TextField
            fullWidth
            type="number"
            label="Budget (USD)"
            value={formData.budget ?? 0}
            onChange={(e) =>
              handleChange('budget', Number(e.target.value))
            }
          />

          <Typography
            variant="caption"
            sx={{ mt: 1, display: 'block', color: 'text.secondary' }}
          >
            Converted INR: ₹
            {formData.budget
              ? (Number(formData.budget) * usdToInr).toFixed(2)
              : 0}
          </Typography>
        </Box>

        <TextField
          select
          fullWidth
          label="Status"
          value={formData.status ?? 'draft'}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={formData.start_date ?? ''}
            onChange={(e) =>
              handleChange('start_date', e.target.value)
            }
          />

          <TextField
            fullWidth
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={formData.end_date ?? ''}
            onChange={(e) =>
              handleChange('end_date', e.target.value)
            }
          />
        </Stack>
      </Stack>
    </Box>
  )
}

export default CampaignForm