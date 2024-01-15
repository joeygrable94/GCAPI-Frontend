/**
 * @summary Refreshes the access token using the refresh token
 *
 * @param refreshToken string of the refresh token to be used to refresh the access token
 * @returns json object containing the new access token and refresh token
 */
export default async function refresh(refreshToken: string) {
  if (process.env.DEBUG) {
    console.log('refreshToken')
  }
  const endpoint = new URL(
    `https://${import.meta.env.AUTH0_DOMAIN}/oauth/token`
  )

  const formData = new URLSearchParams()
  formData.append('grant_type', 'refresh_token')
  formData.append('client_id', import.meta.env.AUTH0_CLIENT_ID)
  formData.append('client_secret', process.env.AUTH0_CLIENT_SECRET!)
  formData.append('refresh_token', refreshToken)

  if (process.env.DEBUG) {
    console.log('formData')
    console.log(formData)
  }

  const authToken = await fetch(endpoint, {
    method: 'POST',
    body: formData
  })

  return authToken.json()
}
