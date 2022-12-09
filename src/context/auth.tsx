import { createSignal, createResource, batch } from "solid-js"
import { Navigate, useNavigate } from "solid-start"
import {
  AuthService,
  BearerResponse,
  Body_auth_access_api_v1_auth_access_post,
  UsersService,
} from "~/api"

import { log } from "./utils"

export default function createAuthService(actions: any) {

  // auth login signal
  const [loggedIn, setLoggedIn] = createSignal(false)
  const navigate = useNavigate();

  // auth server resource
  const [currentUser, {mutate, refetch}] = createResource(
    loggedIn,
    UsersService.usersCurrentUserApiV1UsersMeGet
  )

  // reset auth token utility
  const resetToken = () => {
    actions.setToken("")
    setLoggedIn(false)
    navigate("/auth/login")
    return location.reload()
  }

  // assign auth service actions
  Object.assign(actions, {

    // signal to fetch current user
    pullUser: () => setLoggedIn(true),

    // login the current user
    async login(values: Body_auth_access_api_v1_auth_access_post) {
      try {
        const authBearer: BearerResponse = await AuthService.authAccessApiV1AuthAccessPost({ formData: values })
        actions.setToken(authBearer.access_token)
        setLoggedIn(true)
      } catch (err: any) {
        batch(resetToken)
        log(err)
      }
    },

    // logout the current user
    async logout() {
      try {
        await AuthService.authLogoutApiV1AuthLogoutDelete()
        batch(resetToken)
        log('logout')
      } catch (err: any) {
        log(err.detail)
      }
    }
  })

  // return the fetchable resource
  return currentUser

}
