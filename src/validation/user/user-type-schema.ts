import * as yup from 'yup';

import { EUserType } from '../../config/enums';


export default yup.object({
    type: yup.string().oneOf(Object.keys(EUserType)).required()
})