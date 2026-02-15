import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../../app/store'
import type { Campaign } from './campaigns.types'
import { addCampaign, editCampaign } from './campaigns.thunk'
import CampaignForm from './components/CampaignForm'
import CommonModal from '../../components/CommonModal'
import { useSelector } from 'react-redux'


interface Props {
  open: boolean
  onClose: () => void
  initialData?: Campaign | null
}

const CampaignFormModal = ({ open, onClose, initialData }: Props) => {
  const usdToInr = useSelector(
    (state: RootState) => state?.exchange?.usdToInr ?? 83
  )
  
  const dispatch = useDispatch<AppDispatch>()

  const isEdit = !!initialData

  const [formValues, setFormValues] = useState<Partial<Campaign>>({})

  useEffect(() => {
    if (!open) return

    if (initialData) {
      setFormValues(initialData)
    } else {
      setFormValues({})
    }
  }, [initialData, open])

  const handleSubmit = () => {
    if (!formValues.title?.trim()) return
    if (!formValues.start_date || !formValues.end_date) return
    if (formValues.end_date < formValues.start_date) return

    if (isEdit && initialData) {
      dispatch(editCampaign({
        ...initialData,
        ...formValues
      } as Campaign))
    } else {
      const newCampaign: Campaign = {
        id: crypto.randomUUID(),
        title: formValues.title!,
        platform: formValues.platform!,
        status: formValues.status!,
        budget: Number(formValues.budget),
        start_date: formValues.start_date!,
        end_date: formValues.end_date!,
        likes: 0,
        comments: 0
      }

      dispatch(addCampaign(newCampaign))
    }

    setFormValues({})
    onClose()
  }

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Campaign" : "Create Campaign"}
      confirmLabel={isEdit ? "Update Campaign" : "Create Campaign"}
      onConfirm={handleSubmit}
      confirmDisabled={!formValues.title}
    >
      <CampaignForm
        values={formValues}
        onChange={setFormValues}
        usdToInr={usdToInr}
      />
    </CommonModal>
  )
}

export default CampaignFormModal
