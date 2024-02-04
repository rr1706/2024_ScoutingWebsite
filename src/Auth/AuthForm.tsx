import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./auth.models";
import * as Yup from 'yup';
import Button from "../Utils/Button";
import TextField from "../Utils/TextField";

export default function AuthForm(props: authFormProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().required('Email is Required'),
                password: Yup.string().required('Password is Required')
            })}
        >
            {formikProps => (
                <Form>
                    <TextField displayName="Email" field="email" />
                    <TextField displayName="Password" field="password" type="password" />

                    <Button disabled={formikProps.isSubmitting} type='submit'>Log in</Button> 
                </Form>
            )}
        </Formik>
    )
}

interface authFormProps {
    model: userCredentials;
    onSubmit(values: userCredentials, action: FormikHelpers<userCredentials>): void;
}