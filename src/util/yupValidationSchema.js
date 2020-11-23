import * as yup from 'yup';

export const yupValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  cost_price: yup.number().min(1).required('At least one number'),
});
