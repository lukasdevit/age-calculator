function errorHandler(thing, error) {
    const src = document.querySelector("#" + thing);
    const label = document.querySelector("." + thing + "-label");
    const errorTarget = document.querySelector("." + thing + "-error");
    const errors = {
      notValid: "Must be a valid " + thing,
      required: "This field is required",
      futureError: "Must be in the past",
      notValidDate: "Must be a valid date",
    };
  
    errorTarget.textContent = errors[error];
    errorTarget.classList.add("error");
    src.style.border = "1px solid var(--color-light-red)";
    label.style.color = "var(--color-light-red)";
  }
  
  function validate(variable) {
    const src = document.querySelector("#" + variable);
    const value = parseInt(src.value, 10);
  
    if (isNaN(value) || src.value === "") {
      errorHandler(variable, "required");
      return false;
    }
  
    if (
      (variable === "day" && (value < 1 || value > 31)) ||
      (variable === "month" && (value < 1 || value > 12))
    ) {
      errorHandler(variable, "notValid");
      return false;
    }
  
    if (variable === "year" && value > new Date().getFullYear()) {
      errorHandler(variable, "futureError");
      return false;
    }

    if (variable === "year" && !isValid(new Date(value, document.querySelector("#month").value - 1, document.querySelector("#day").value))) {
      errorHandler(variable, "notValidDate");
      return false;
    }
  
    const errorTarget = document.querySelector("." + variable + "-error");
    errorTarget.textContent = "";
    errorTarget.classList.remove("error");
    src.style.border = "1px solid var(--color-light-grey)";
    const label = document.querySelector("." + variable + "-label");
    label.style.color = "var(--color-light-grey)";
  
    return true;
  }
  
  function calculateAge() {
    const currentDate = new Date();
    const day = document.querySelector("#day").value;
    const month = document.querySelector("#month").value;
    const year = document.querySelector("#year").value;
    const inputDate = new Date(year, month - 1, day);
  
    if (validate("day") === false || validate("month") === false || validate("year") === false) {
      return false;
    }
  
    const ageInMilliseconds = currentDate - inputDate;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
  
    const years = Math.floor(ageInDays / 365);
    const months = Math.floor((ageInDays % 365) / 30);
    const days = Math.floor(ageInDays % 30);
  
    const yearToChange = document.querySelector("#year-value");
    const monthToChange = document.querySelector("#month-value");
    const dayToChange = document.querySelector("#day-value");
    yearToChange.textContent = years;
    monthToChange.textContent = months;
    dayToChange.textContent = days;
  }
  
  function setupFormValidation() {
    const form = document.querySelector(".js-calculate-data");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const list = ["day", "month", "year"];
      const errors = [];
  
      list.forEach((element) => {
        if (!validate(element, errors)) {
          return false;
        }
      });
  
      if (errors.length === 0) {
        calculateAge();
      }
    });
  }
  
  setupFormValidation();
  