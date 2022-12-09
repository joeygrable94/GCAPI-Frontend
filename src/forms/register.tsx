import type { Component } from "solid-js";
import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";
import { reporter, ValidationMessage } from '@felte/reporter-solid';
import { useStore } from "~/context";
import { log } from "~/context/utils";
import { UserCreate, $UserCreate } from "~/api";

export const UserRegisterForm: Component = () => {

	const [,actions]: any = useStore()

	// @ts-ignore
	const { form, errors } = createForm({
		extend: [validator, reporter],
		validateSchema: $UserCreate,
		onSubmit: async (values: UserCreate, context: any) =>
			log(values),
		onError: (error: any, context: any) => {
			log(error)
		}
	});

	return (
		// @ts-ignore
		<form use:form class="row">
			<div class="col-12 my-2">
				<label for="email">Email</label>
				<input type="text" name="email" class="form-control" />
				<ValidationMessage for="email">
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
	);
};
