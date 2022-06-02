import * as yup from 'yup';


export default yup.object({
    name: yup.string().min(2).required(),
    surname: yup.string().min(2).required(),
    password: yup.string().min(8).required(),
    email: yup.string().email().required()
});