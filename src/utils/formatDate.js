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

// change format date from YYYY-MM-DD to DAY[space]MONTH[space]YEAR
export const changeFormatDateToDayMonthYear = (value) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [year, month, day] = value.split("-");
  const monthIndex = parseInt(month) - 1;
  return `${day} ${months[monthIndex]} ${year}`;
};

export const getLocaleDate = (value) => {
  const date = new Date(value);
  const splitedDate = date.toString().split(" ");
  const time = splitedDate[4].slice(0, -3);
  const timeZone = splitedDate[5].replace(/[0]/g, "");
  const localZone = [splitedDate[6], splitedDate[7], splitedDate[8]].join(" ");
  const dateAsObject = {
    date: `${splitedDate[2]} ${splitedDate[1]} ${splitedDate[3]}`,
    time: time,
    timeZone: timeZone.replace("GMT", "UTC"),
    localZone: localZone,
  };
  return dateAsObject;
};
