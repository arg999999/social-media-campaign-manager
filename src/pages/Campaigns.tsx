import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  IconButton,
  Button
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react'
import CommonModal from '../components/CommonModal'

import type { Campaign } from '../features/campaigns/campaigns.types'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { fetchCampaigns, removeCampaign } from '../features/campaigns/campaigns.thunk'
import CampaignFormModal from '../features/campaigns/CampaignFormDrawer'

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'published':
      return { backgroundColor: '#d1fae5', color: '#065f46' }
    case 'scheduled':
      return { backgroundColor: '#fef3c7', color: '#92400e' }
    case 'draft':
      return { backgroundColor: '#e5e7eb', color: '#374151' }
    default:
      return {}
  }
}

const Campaigns = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { campaigns } = useSelector(
    (state: RootState) => state.campaigns
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchCampaigns())
  }, [dispatch])

  /* ---------- Create ---------- */
  const handleOpenCreate = () => {
    setSelectedCampaign(null)
    setIsModalOpen(true)
  }

  /* ---------- Edit ---------- */
  const handleOpenEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCampaign(null)   // 🔥 important reset
  }

  /* ---------- Delete ---------- */
  const handleOpenDelete = (id: string) => {
    setSelectedId(id)
    setIsDeleteOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedId) {
      dispatch(removeCampaign(selectedId))
    }

    setIsDeleteOpen(false)
    setSelectedId(null)
  }

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Campaigns
          </Typography>

          <Button variant="contained" onClick={handleOpenCreate}>
            Create Campaign
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Budget ($)</TableCell>
                  <TableCell>Start</TableCell>
                  <TableCell>End</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id} hover>
                    <TableCell>{campaign.title}</TableCell>
                    <TableCell>{campaign.platform}</TableCell>

                    <TableCell>
                      <Chip
                        label={campaign.status}
                        size="small"
                        sx={{
                          width: 100,
                          justifyContent: 'center',
                          fontWeight: 500,
                          textTransform: 'capitalize',
                          borderRadius: 8,
                          ...getStatusStyles(campaign.status)
                        }}
                      />
                    </TableCell>

                    <TableCell>{campaign.budget}</TableCell>
                    <TableCell>{campaign.start_date}</TableCell>
                    <TableCell>{campaign.end_date}</TableCell>

                    <TableCell align="right">
                      <IconButton onClick={() => handleOpenEdit(campaign)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleOpenDelete(campaign.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Box>

      {/* Create / Edit Modal */}
      <CampaignFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        initialData={selectedCampaign}
      />

      {/* Delete Modal */}
      <CommonModal
        open={isDeleteOpen}
        title="Delete Campaign"
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        confirmLabel="Delete"
        confirmColor="error"
      >
        <Box
          sx={{
            textAlign: 'center',
            py: 2,
            px: 3
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2
            }}
          >
            <DeleteIcon sx={{ fontSize: 36, color: '#dc2626' }} />
          </Box>

          <Typography variant="h6" fontWeight={600} mb={1}>
            Are you sure?
          </Typography>

          <Typography variant="body2" color="text.secondary">
            This action cannot be undone.
            This will permanently delete the campaign.
          </Typography>
        </Box>
      </CommonModal>
    </>
  )
}

export default Campaigns