import dayjs from "dayjs";

/**
 * Gets the address from the postal code using the Postcode-JP API.
 *
 * @param {string} postCode - The postal code to look up.
 * @return {Promise} A Promise that resolves to the JSON response from the API.
 */
export const getAddressFromPostalCode = async (postCode) => {
  const resp = await fetch(
    `https://apis.postcode-jp.com/api/v5/postcodes/${postCode}`,
    {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_POST_JP_API_KEY,
      },
    }
  );

  return resp.json();
};

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
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;

  // Check if the string contains at least one of each
  const containsSymbol = symbolRegex.test(value);
  const containsUppercase = uppercaseRegex.test(value);
  const containsNumber = numberRegex.test(value);

  return (
    value.length >= 8 && containsSymbol && containsUppercase && containsNumber
  );
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
export const getYears = () => {
  const years = [];
  for (let i = 0; i < 100; i++) {
    years.push({
      value: dayjs().year() - i,
      label: dayjs().year() - i,
    });
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
 * @return {Array} An array of objects containing 'value' and 'label' properties.
 */
export const getDays = () => {
  const days = [];
  for (let day = 1; day <= 31; day++) {
    days.push({
      value: day.toString().padStart(2, "0"),
      label: day.toString().padStart(2, "0"),
    });
  }
  return days;
};
