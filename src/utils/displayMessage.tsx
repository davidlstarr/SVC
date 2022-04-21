import { toast } from 'react-toastify';

type TypeMessage = 'success' | 'error';

export const displayMessage = (message: string, type: TypeMessage) => {
  const options: any = {
    position: 'top-center',
    pauseOnHover: false,
    closeOnClick: true,
    autoClose: 5000,
    theme: 'colored',
  };

  if (type === 'error') {
    toast.error(message, options);
  } else if (type === 'success') {
    toast.success(message, options);
  }
};
