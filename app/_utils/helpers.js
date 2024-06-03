/* eslint-disable no-useless-escape */
import dayjs from "dayjs";

/**
 * Checks for null or undefined and returns the value or a dash if null or undefined.
 *
 * @param {any} value - the value to check for null or undefined
 * @return {any} the original value or a dash if null or undefined
 */
export const nullSafety = (value) => {
  let result = "-";
  if (value !== null && value !== undefined) {
    result = value;
  }
  return result;
};

/**
 * Check if the value is null or undefined.
 *
 * @param {any} value - The value to check
 * @return {boolean} Whether the value is null or undefined
 */
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

/**
 * Returns the full name by concatenating the provided last name and first name.
 *
 * @param {string} lastName - The last name
 * @param {string} firstName - The first name
 * @return {string} The full name, or "-" if either last name or first name is not provided
 */
export const getFullName = (lastName, firstName) => {
  let result = "-";
  if (lastName && firstName) {
    result = `${lastName} ${firstName}`;
  }
  return result;
};

/**
 * Function to add a thousands separator to a number.
 *
 * @param {number} value - The number to add the separator to
 * @return {string} The number with the thousands separator added
 */
export const thousandSeparator = (value) => {
  let result = "-";
  if (!isNaN(+value)) {
    result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return result;
};

/**
 * Validate if the input value is a valid password.
 *
 * @param {string} value - The value to be validated
 * @return {boolean} Whether the value is a valid password or not
 */
export const isValidPassword = (value) => {
  // Regular expressions to check for symbol, uppercase character, and number
  const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const uppercaseRegex = /[A-Z]/;
  const lowecaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;

  // Check if the string meets the length requirement
  const isLongEnough = value?.length >= 8;

  let cretariasMet = 0;

  if (symbolRegex.test(value)) cretariasMet++;
  if (lowecaseRegex.test(value)) cretariasMet++;
  if (uppercaseRegex.test(value)) cretariasMet++;
  if (numberRegex.test(value)) cretariasMet++;

  // Check if the password meets the criteria
  return {
    isLongEnough,
    isContainingSymbol: symbolRegex.test(value),
    isContainingLowercase: value ? lowecaseRegex.test(value) : false,
    isContainingUppercase: uppercaseRegex.test(value),
    isContainingNumber: numberRegex.test(value),
    cretariasMet,
  };
};

/**
 * Creates a query string from the given query object.
 *
 * @param {Object} queryObject - the object containing key-value pairs for the query parameters
 * @return {string} the query string generated from the query object
 */
export const createQueryString = (queryObject) => {
  if (!queryObject) {
    return "";
  }

  let queryString = "?";
  const keys = Object.keys(queryObject);

  keys.forEach((key, idx) => {
    if (idx === keys.length - 1) {
      queryString += `${key}=${queryObject[key]}`;
    } else {
      queryString += `${key}=${queryObject[key]}&`;
    }
  });

  return queryString;
};

/**
 * Generates an array of objects representing years.
 *
 * @return {Array} An array of objects containing the value and label of each year.
 */
export const getYears = (min, max) => {
  const years = [];
  if (min && max) {
    for (let i = min; i < max; i++) {
      years.push({
        value: dayjs().year() - i,
        label: dayjs().year() - i,
      });
    }
  }
  return years;
};

/**
 * Generates an array of objects representing months with formatted values and labels.
 *
 * @return {Array} An array of objects containing month values and labels
 */
export const getMonths = () => {
  const months = [];
  for (let month = 1; month <= 12; month++) {
    months.push({
      value: dayjs()
        .month(month - 1)
        .format("MM"),
      label: dayjs()
        .month(month - 1)
        .format("MM"),
    });
  }
  return months;
};

/**
 * Generates an array of days with padded values from 01 to 31.
 *
 * @param {number} year - The year for which the days are to be generated.
 * @param {number} month - The month for which the days are to be generated.
 * @return {Array<string>} An array of strings representing the days of the month with padded values from 01 to 31.
 */
export const getDays = (year, month) => {
  if (!year || !month) {
    return [];
  }
  // Create a dayjs object for the first day of the given month and year
  const date = dayjs(`${year}-${month}-01`);

  // Get the number of days in the month
  const daysInMonth = date.daysInMonth();

  // Generate an array of days for the month
  const days = Array.from({ length: daysInMonth }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  return days;
};
