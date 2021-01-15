export function getDateText(e) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let result = "";

  const end = new Date(e.end_date);

  if (e.start_date === null) {
    //no start date --- "By 25 January 2020"
    let date_str =
      "By " +
      end.getDate() +
      " " +
      monthNames[end.getMonth()] +
      " " +
      end.getFullYear();
    result = date_str;
  } else {
    //has start date
    const start = new Date(e.start_date);
    let date_str = "";

    if (start.getFullYear() === end.getFullYear()) {
      if (start.getMonth() === end.getMonth()) {
        //same month same year --- "1 - 30 September 2020"
        date_str =
          start.getDate() +
          " - " +
          end.getDate() +
          " " +
          monthNames[end.getMonth()] +
          " " +
          end.getFullYear();
      } else {
        //different months --- "1 August - 25 September 2020"
        date_str =
          start.getDate() +
          " " +
          monthNames[start.getMonth()] +
          " - " +
          end.getDate() +
          " " +
          monthNames[end.getMonth()] +
          " " +
          end.getFullYear();
      }
    } else {
      //seperate year --- "1 September 2020 - 30 September 2021"
      date_str =
        start.getDate() +
        " " +
        monthNames[start.getMonth()] +
        " " +
        start.getFullYear() +
        " - " +
        end.getDate() +
        " " +
        monthNames[end.getMonth()] +
        " " +
        end.getFullYear();
    }

    result = date_str;
  }

  return result;
}

export const getSessionBaseUrl = () => {
  if (window.location.search.includes("promptapi")) {
    sessionStorage.apiBaseUrl =
      window.prompt(
        "Enter the API base URL",
        sessionStorage.apiBaseUrl || ""
      ) || "";
  }
  return sessionStorage.apiBaseUrl;
};
