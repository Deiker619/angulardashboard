import Swal, { SweetAlertOptions } from 'sweetalert2';

export function showNotification(options: SweetAlertOptions) {
  return Swal.fire({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    ...options 
  });
}

export function awaitNotification(){
    return Swal.fire({
        toast: true,
        position: 'bottom-end',
        customClass:{
          title: 'text-white'
        },
        background: '#0471A6',
        showConfirmButton: false,
        title: 'Procesando solicitud...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Mostrar spinner
        }
    })
}

export function closeSwal(){
  Swal.close()
}