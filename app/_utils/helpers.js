export const getAddressFromPostalCode = async (postCode) => {
    const resp = await fetch(`https://apis.postcode-jp.com/api/v5/postcodes/${postCode}`, {
      headers: {
        'X-API-KEY': 'TB5GweBWnDJ6zGvW0oiv6lrleD9gHmTunBzwXiR'
      }
    })

    return resp.json()
}