import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Почта обязательная'),
  password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязательный'),
});

export const RegistryFormSchema = yup.object().shape({
  fullName: yup.string().min(3, 'Введите имя и фамилию').required('Имя и фамилия обязательная'),
}).concat(LoginFormSchema);