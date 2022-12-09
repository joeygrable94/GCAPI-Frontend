import { Component } from "solid-js"
import { createForm } from "@felte/solid"
import { validator } from "@felte/validator-yup"
import { reporter, ValidationMessage } from '@felte/reporter-solid';
import { useStore } from "~/context"
import {
  Body_auth_access_api_v1_auth_access_post,
  $Body_auth_access_api_v1_auth_access_post,
} from "~/api"
import { log } from "~/context/utils"

export const UserLoginForm: Component = () => {

  const [,actions]: any = useStore()

	// @ts-ignore
	const { form, errors, data, isValid } = createForm({
    extend: [validator, reporter],
    validateSchema: $Body_auth_access_api_v1_auth_access_post,
		onSubmit: async (values: Body_auth_access_api_v1_auth_access_post, context: any) =>
      await actions.login(values),
    onError: (error: any, context: any) => {
      log(error)
    }
	})

	return (
    // @ts-ignore
    <form use:form class="row">
      <div class="col-12 my-2">
        <label for="username">Username</label>
        <input type="text" name="username" class="form-control" />
        <ValidationMessage for="username">
          {(message) => <span class="invalid-feedback">{message}</span>}
        </ValidationMessage>
      </div>
      <div class="col-12 my-2">
        <label for="password">Password</label>
        <input type="password" name="password" class="form-control" />
        <ValidationMessage for="password">
          {(message) => <span class="invalid-feedback">{message}</span>}
        </ValidationMessage>
      </div>
      <div class="col-12 my-2">
        <input type="submit" value="Sign In" class="btn btn-primary" />
      </div>
    </form>
	)
}
