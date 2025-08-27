import { toast } from 'sonner'

export const notifySuccess = (message: string) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-right',
  })
}

export const notifyError = (message: string) => {
  toast.error(message, {
    duration: 6000,
    position: 'top-right',
  })
}

export const notifyInfo = (message: string) => {
  toast.info(message, {
    duration: 4000,
    position: 'top-right',
  })
}

export const notifyWarning = (message: string) => {
  toast.warning(message, {
    duration: 5000,
    position: 'top-right',
  })
}