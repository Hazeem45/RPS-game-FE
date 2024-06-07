export const errorHandler = (error) => {
  const alertValue = {
    alertTitle: null,
    alertMessage: null,
    alertButton: null,
  };

  if (error.code === "ERR_NETWORK") {
    alertValue.alertTitle = `${error.message}`;
    alertValue.alertMessage = "Try refresh the page or contact the developer";
    alertValue.alertButton = "RELOAD";
  } else if (error.response.status) {
    if (error.response.status === 401) {
      alertValue.alertTitle = `${error.response.data.name} ( ${error.response.data.message} )`;
      alertValue.alertMessage = "Please relog to continue using the app";
      alertValue.alertButton = "RELOG";
    } else if (error.response.status === 500 || error.response.status === 504) {
      if (error.response.status === 500) {
        alertValue.alertTitle = `${error.response.statusText}`;
      } else if (error.response.status === 504) {
        alertValue.alertTitle = `${error.message}`;
      }
      alertValue.alertMessage = "Try to reload the page or contact the developer";
      alertValue.alertButton = "RELOAD";
    } else {
      alert(error);
    }
  } else {
    alert(error);
  }

  return alertValue;
};
