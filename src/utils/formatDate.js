// change format date from YYYY-MM-DD to DD/MM/YYYY
export const changeFormatDateToDDMMYYYY = (value) => {
  const splitDate = value.split("-");
  return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
};

// change format date from DAY[space]MONTH[space]YEAR to YYYY-MM-DD
export const changeFormatDateToYYYYMMDD = (value) => {
  const monthNames = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  const dateParts = value.split(" ");
  const day = dateParts[0];
  const monthName = dateParts[1];
  const year = dateParts[2];
  const monthNumber = monthNames[monthName];
  const formattedDate = `${year}-${monthNumber}-${day}`;
  return formattedDate;
};
