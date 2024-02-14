const initApp = async () => {
  console.log("DOM Content Loaded!");
  setMaxYear();
  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.addEventListener("click", submitFn);
};

document.addEventListener("DOMContentLoaded", initApp);

const setMaxYear = () => {
  document.getElementById("year").setAttribute("max", new Date().getFullYear());
};

const submitFn = (event) => {
  event.preventDefault();
  const day = dayFn();
  const month = monthFn();
  const year = yearFn();

  const correctDaysRange = checkDays(day, month, year);
  if (!correctDaysRange) {
    document.getElementById("day-label").classList.add("input-error-label");
    document.getElementById("month-label").classList.add("input-error-label");
    document.getElementById("year-label").classList.add("input-error-label");
    document.getElementById("day").classList.add("input-error-field-outline");
    document.getElementById("month").classList.add("input-error-field-outline");
    document.getElementById("year").classList.add("input-error-field-outline");
    document.getElementById("error-day-text").textContent =
      "Must be a valid day";
    document.getElementById("error-day-text").style.display = "block";
    document.getElementById("age-days").textContent = "--";
    document.getElementById("age-months").textContent = "--";
    document.getElementById("age-years").textContent = "--";
    document.getElementById("age-days").style.letterSpacing = "16px";
    document.getElementById("age-months").style.letterSpacing = "16px";
    document.getElementById("age-years").style.letterSpacing = "16px";
  }

  if (day && month && year && correctDaysRange) {
    calculateAge(day, month, year);
  }
};

const checkDays = (day, month, year) => {
  let correctDaysRange = true;
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    if (day > 30) {
      console.log(
        `${
          monthsArray[month - 1]
        } does not have that amount of days!\n(Correct range: 1-30 days)`
      );
      correctDaysRange = false;
    }
  } else if (month === 2 && year % 4 === 0) {
    if (day > 29) {
      console.log(
        `${
          monthsArray[month - 1]
        } (in leap year) does not have that amount of days!\n(Correct range: 1-29 days)`
      );
      correctDaysRange = false;
    }
  } else if (month === 2 && year % 4 !== 0) {
    if (day > 28) {
      console.log(
        `${
          monthsArray[month - 1]
        } does not have that amount of days!\n(Correct range: 1-28 days)`
      );
      correctDaysRange = false;
    }
  }
  return correctDaysRange;
};

const monthsObj = {
  m1: 31,
  m2: 28, // svake prestupne je 29 NAPRAVI
  m3: 31,
  m4: 30,
  m5: 31,
  m6: 30,
  m7: 31,
  m8: 31,
  m9: 30,
  m10: 31,
  m11: 30,
  m12: 31,
};

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Oktober",
  "November",
  "December",
];

const calculateAge = (day, month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentDay = currentDate.getDate();

  let ageDays;
  let ageMonths;
  let ageYears;
  if (currentDay - day < 0) {
    if (currentMonth - month >= 1) {
      ageYears = currentYear - year;
      ageMonths = currentMonth - month - 1;
      if (ageMonths >= 1) {
        if (currentYear % 4 === 0 && ageMonths === 1) {
          ageDays =
            monthsObj["m" + Number(ageMonths + 1)] + 1 + (currentDay - day) + 1;
          // dodatno +1 u odnosu na ispod je kako bi mesec februar imao 29 dana u prestupnoj godini
        } else {
          ageDays =
            monthsObj["m" + Number(ageMonths + 1)] + (currentDay - day) + 1;
          // ageMonths + 1 zbog pravilnog ispisa meseca (0 je januar ima 31 dan; decembar je 11, 12 mesec plus dani ne postoji jer bi bio 13 mesec);   +1 sluzi da bi se vratilo u poslednji dan meseca pre ili neki raniji dan u zavisnosti od trenutnog datuma i unetog datuma
        }
      } else {
        ageDays = monthsObj["m1"] + (currentDay - day) + 1;
      }
    } else if (currentMonth - month === 0) {
      ageMonths = 12 - 1;
      ageDays = monthsObj["m" + Number(ageMonths + 1)] + (currentDay - day) + 1;
      if (currentYear - year >= 1) {
        ageYears = currentYear - year - 1;
      } else {
        console.log("GRESKA! UNET DATUM IZ BUDUCNOSTI!");
        document.getElementById("day-label").classList.add("input-error-label");
        document
          .getElementById("month-label")
          .classList.add("input-error-label");
        document
          .getElementById("year-label")
          .classList.add("input-error-label");
        document
          .getElementById("day")
          .classList.add("input-error-field-outline");
        document
          .getElementById("month")
          .classList.add("input-error-field-outline");
        document
          .getElementById("year")
          .classList.add("input-error-field-outline");
        document.getElementById("error-day-text").textContent =
          "Must be a valid date";
        document.getElementById("error-day-text").style.display = "block";
        document.getElementById("age-days").textContent = "--";
        document.getElementById("age-months").textContent = "--";
        document.getElementById("age-years").textContent = "--";
        document.getElementById("age-days").style.letterSpacing = "16px";
        document.getElementById("age-months").style.letterSpacing = "16px";
        document.getElementById("age-years").style.letterSpacing = "16px";
        return;
      }
    } else {
      ageMonths = 12 + (currentMonth - month) - 1; // -1 jer se vracaju i dani i meseci (currentMonth - month) bude neki negativan br, toliko meseci se oduzima od ukupnog broja, i onda jos -1 jer su se dani isto vracali u prosli mesec
      if (currentYear % 4 === 0 && ageMonths === 1) {
        ageDays =
          monthsObj["m" + Number(ageMonths + 1)] + 1 + (currentDay - day) + 1;
      } else {
        ageDays =
          monthsObj["m" + Number(ageMonths + 1)] + (currentDay - day) + 1;
      }
      if (currentYear - year >= 1) {
        ageYears = currentYear - year - 1;
      } else {
        console.log("GRESKA! UNET DATUM IZ BUDUCNOSTI!");
        document.getElementById("day-label").classList.add("input-error-label");
        document
          .getElementById("month-label")
          .classList.add("input-error-label");
        document
          .getElementById("year-label")
          .classList.add("input-error-label");
        document
          .getElementById("day")
          .classList.add("input-error-field-outline");
        document
          .getElementById("month")
          .classList.add("input-error-field-outline");
        document
          .getElementById("year")
          .classList.add("input-error-field-outline");
        document.getElementById("error-day-text").textContent =
          "Must be a valid date";
        document.getElementById("error-day-text").style.display = "block";
        document.getElementById("age-days").textContent = "--";
        document.getElementById("age-months").textContent = "--";
        document.getElementById("age-years").textContent = "--";
        document.getElementById("age-days").style.letterSpacing = "16px";
        document.getElementById("age-months").style.letterSpacing = "16px";
        document.getElementById("age-years").style.letterSpacing = "16px";
        return;
      }
    }
  } else if (currentDay - day >= 0) {
    ageDays = currentDay - day;
    if (currentMonth - month >= 0) {
      ageMonths = currentMonth - month;
      ageYears = currentYear - year;
    } else {
      ageMonths = 12 + (currentMonth - month);
      if (currentYear - year >= 1) {
        ageYears = currentYear - year - 1;
      } else {
        console.log("GRESKA! UNET DATUM IZ BUDUCNOSTI!");
        document.getElementById("day-label").classList.add("input-error-label");
        document
          .getElementById("month-label")
          .classList.add("input-error-label");
        document
          .getElementById("year-label")
          .classList.add("input-error-label");
        document
          .getElementById("day")
          .classList.add("input-error-field-outline");
        document
          .getElementById("month")
          .classList.add("input-error-field-outline");
        document
          .getElementById("year")
          .classList.add("input-error-field-outline");
        document.getElementById("error-day-text").textContent =
          "Must be a valid date";
        document.getElementById("error-day-text").style.display = "block";
        document.getElementById("age-days").textContent = "--";
        document.getElementById("age-months").textContent = "--";
        document.getElementById("age-years").textContent = "--";
        document.getElementById("age-days").style.letterSpacing = "16px";
        document.getElementById("age-months").style.letterSpacing = "16px";
        document.getElementById("age-years").style.letterSpacing = "16px";
        return;
      }
    }
  }

  document.getElementById("age-years").style.letterSpacing = "11px";
  document.getElementById("age-years").textContent = ageYears;
  document.getElementById("age-months").style.letterSpacing = "11px";
  document.getElementById("age-months").textContent = ageMonths;
  document.getElementById("age-days").style.letterSpacing = "11px";
  document.getElementById("age-days").textContent = ageDays;
};

const dayFn = () => {
  document.getElementById("day-label").classList.remove("input-error-label");
  document.getElementById("day").classList.remove("input-error-field-outline");
  document.getElementById("error-day-text").style.display = "none";
  const dayInput = document.getElementById("day");
  if (dayInput.value) {
    const day = Number(dayInput.value);
    if (day >= 1 && day <= 31) {
      //   console.log("ISPRAVAN DAN");
      return day;
    } else {
      document.getElementById("day-label").classList.add("input-error-label");
      document.getElementById("day").classList.add("input-error-field-outline");
      document.getElementById("error-day-text").textContent =
        "Must be a valid day";
      document.getElementById("error-day-text").style.display = "block";
      document.getElementById("age-days").textContent = "--";
      document.getElementById("age-months").textContent = "--";
      document.getElementById("age-years").textContent = "--";
      document.getElementById("age-days").style.letterSpacing = "16px";
      document.getElementById("age-months").style.letterSpacing = "16px";
      document.getElementById("age-years").style.letterSpacing = "16px";
    }
  } else {
    document.getElementById("day-label").classList.add("input-error-label");
    document.getElementById("day").classList.add("input-error-field-outline");
    document.getElementById("error-day-text").textContent =
      "This field is required";
    document.getElementById("error-day-text").style.display = "block";
    document.getElementById("age-days").textContent = "--";
    document.getElementById("age-months").textContent = "--";
    document.getElementById("age-years").textContent = "--";
    document.getElementById("age-days").style.letterSpacing = "16px";
    document.getElementById("age-months").style.letterSpacing = "16px";
    document.getElementById("age-years").style.letterSpacing = "16px";
  }
};

const monthFn = () => {
  document.getElementById("month-label").classList.remove("input-error-label");
  document
    .getElementById("month")
    .classList.remove("input-error-field-outline");
  document.getElementById("error-month-text").style.display = "none";
  const monthInput = document.getElementById("month");
  if (monthInput.value) {
    const month = Number(monthInput.value);
    if (month >= 1 && month <= 12) {
      //   console.log("ISPRAVAN MESEC");
      return month;
    } else {
      document.getElementById("month-label").classList.add("input-error-label");
      document
        .getElementById("month")
        .classList.add("input-error-field-outline");
      document.getElementById("error-month-text").textContent =
        "Must be a valid month";
      document.getElementById("error-month-text").style.display = "block";
      document.getElementById("age-days").textContent = "--";
      document.getElementById("age-months").textContent = "--";
      document.getElementById("age-years").textContent = "--";
      document.getElementById("age-days").style.letterSpacing = "16px";
      document.getElementById("age-months").style.letterSpacing = "16px";
      document.getElementById("age-years").style.letterSpacing = "16px";
    }
  } else {
    document.getElementById("month-label").classList.add("input-error-label");
    document.getElementById("month").classList.add("input-error-field-outline");
    document.getElementById("error-month-text").textContent =
      "This field is required";
    document.getElementById("error-month-text").style.display = "block";
    document.getElementById("age-days").textContent = "--";
    document.getElementById("age-months").textContent = "--";
    document.getElementById("age-years").textContent = "--";
    document.getElementById("age-days").style.letterSpacing = "16px";
    document.getElementById("age-months").style.letterSpacing = "16px";
    document.getElementById("age-years").style.letterSpacing = "16px";
  }
};

const yearFn = () => {
  const dateObj = new Date();
  const currentYear = dateObj.getUTCFullYear();
  document.getElementById("year-label").classList.remove("input-error-label");
  document.getElementById("year").classList.remove("input-error-field-outline");
  document.getElementById("error-year-text").style.display = "none";
  const yearInput = document.getElementById("year");
  if (yearInput.value) {
    const year = Number(yearInput.value);
    if (year >= 1900 && year <= currentYear) {
      //   console.log("ISPRAVNA GODINA");
      return year;
    } else {
      document.getElementById("year-label").classList.add("input-error-label");
      document
        .getElementById("year")
        .classList.add("input-error-field-outline");
      document.getElementById("error-year-text").textContent =
        "Must be in the past";
      console.log(`Year must be in range: 1901-${currentYear}`);
      document.getElementById("error-year-text").style.display = "block";
      document.getElementById("age-days").textContent = "--";
      document.getElementById("age-months").textContent = "--";
      document.getElementById("age-years").textContent = "--";
      document.getElementById("age-days").style.letterSpacing = "16px";
      document.getElementById("age-months").style.letterSpacing = "16px";
      document.getElementById("age-years").style.letterSpacing = "16px";
    }
  } else {
    document.getElementById("year-label").classList.add("input-error-label");
    document.getElementById("year").classList.add("input-error-field-outline");
    document.getElementById("error-year-text").textContent =
      "This field is required";
    document.getElementById("error-year-text").style.display = "block";
    document.getElementById("age-days").textContent = "--";
    document.getElementById("age-months").textContent = "--";
    document.getElementById("age-years").textContent = "--";
    document.getElementById("age-days").style.letterSpacing = "16px";
    document.getElementById("age-months").style.letterSpacing = "16px";
    document.getElementById("age-years").style.letterSpacing = "16px";
  }
};
