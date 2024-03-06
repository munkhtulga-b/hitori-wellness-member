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

export const nullSafety = (value) => {
  let result = "-";
  if (value !== null && value !== undefined) {
    result = value;
  }
  return result;
};
