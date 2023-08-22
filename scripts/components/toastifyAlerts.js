//************************************************* Toastify Alerts *************************************************
function toastifyAlert(text, alertType, keepApart) {
    if (keepApart) {
      Toastify({
        text: text,
        className: alertType,
        position: 'left',
        duration: 10000,
      }).showToast()
    } else {
      Toastify({
        text: text,
        className: alertType,
        duration: 10000,
      }).showToast()
    }
  }