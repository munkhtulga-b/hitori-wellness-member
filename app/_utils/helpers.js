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
