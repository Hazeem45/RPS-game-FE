export const errorHandler = (error) => {
  switch (error.response?.status) {
    case 401:
      return {
        alertTitle: error.response.data.name,
        alertMessage: `${error.response.data.message}, please relog to continue using the app`,
        alertButton: "RELOG",
      };
    case 500:
      return {
        alertTitle: "Server Error",
        alertMessage: "An internal server error occurred.",
        alertButton: "RELOAD",
      };
    case 504:
      return {
        alertTitle: "Gateway Timeout",
        alertMessage: "The server did not respond in time.",
        alertButton: "RELOAD",
      };
    default:
      return {
        alertTitle: "Error",
        alertMessage: error.message,
        alertButton: "RELOAD",
      };
  }
};
