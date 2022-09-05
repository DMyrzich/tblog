import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useForm, FormProvider } from "react-hook-form";

import { setCookie } from 'nookies';
import styles from '../AuthDialog.module.scss';
import TextFormField from '../textField';
import { RegistryFormSchema } from '../../Api/validations';
import { RegistryDto } from "../../Api/dto";
import { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../Api';


interface LoginFormProps {
    setAuthBack: () => void;
}

const RegistryAuth: React.FC<LoginFormProps> = ({ setAuthBack }) => {

    const form = useForm({ mode: 'onChange', resolver: yupResolver(RegistryFormSchema) });
    const [errorForm, setErrorForm] = useState("");
    const dispatch = useAppDispatch()

    const onSubmit = async (dto: RegistryDto) => {

        try {

            setErrorForm("");
            const data = await Api().user.registry(dto);
            setCookie(null, 'JRToken', data.access_token, { maxAge: 30 * 24 * 60 * 60, path: '/', })
            dispatch(setUserData(data));
        }
        catch (err) {

            setErrorForm(err.response.data.message);
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div onClick={setAuthBack} className={styles.authEmail}>
                    <ArrowBack />
                    Назад
                </div>
                <TextFormField name='fullName' label='Имя и фамилия' />
                <TextFormField name='email' label='Почта' />
                <TextFormField className="mb-10" name='password' label='Пароль' type='password' />
                {errorForm && <Alert severity="error">
                    {errorForm}
                </Alert>}
                <div className={styles.registryAuthButton}>
                    <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type='submit' className="mt-15" color="primary" variant="contained">Регистрация</Button>
                    <Typography onClick={setAuthBack} className={styles.registryAuth}>Войти</Typography>
                </div>
            </form>
        </FormProvider>
    )
}

export default RegistryAuth;