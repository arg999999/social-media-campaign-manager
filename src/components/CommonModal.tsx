import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Divider,
  Button,
  Box,
  CircularProgress
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { ReactNode } from 'react'

interface CommonModalProps {
  open: boolean
  title: string
  onClose: () => void

  onConfirm?: () => void
  confirmLabel?: string
  cancelLabel?: string

  confirmDisabled?: boolean
  confirmLoading?: boolean
  confirmColor?: 'primary' | 'error'

  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg'
}

const CommonModal = ({
  open,
  title,
  onClose,
  onConfirm,
  confirmLabel = 'Save',
  cancelLabel = 'Cancel',
  confirmDisabled = false,
  confirmLoading = false,
  confirmColor = 'primary',
  children,
  maxWidth = 'sm'
}: CommonModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>

        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Box>{children}</Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 1,
          gap: 2
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          onClick={onClose}
        >
          {cancelLabel}
        </Button>

        <Button
          variant="contained"
          color={confirmColor}
          fullWidth
          onClick={onConfirm}
          disabled={confirmDisabled || confirmLoading}
        >
          {confirmLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            confirmLabel
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CommonModal