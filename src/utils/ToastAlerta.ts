// src/utils/ToastAlerta.ts
import { toast } from "react-toastify";

export function ToastAlerta(mensagem: string, tipo: string) {
  const config = {
    position: 'top-right' as const,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: 'colored' as const,
    progress: undefined,
  };

  switch (tipo) {
    case 'sucesso':
      toast.success(mensagem, config);
      break;

    case 'erro':
      toast.error(mensagem, config);
      break;

    case 'info':
      toast.info(mensagem, config);
      break;

    case 'aviso':
      toast.warning(mensagem, config);
      break;

    default:
      toast(mensagem, config);
      break;
  }
}