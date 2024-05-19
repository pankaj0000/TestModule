import * as yup from 'yup';
import {BundleStrings} from '../constants/BundleString';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const authValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(emailRegex, BundleStrings.error.invalidEmail)
    .required(BundleStrings.error.email),
  password: yup
    .string()
    .matches(passwordRegex, BundleStrings.error.invalidPassword)
    .required(BundleStrings.error.password),
});
