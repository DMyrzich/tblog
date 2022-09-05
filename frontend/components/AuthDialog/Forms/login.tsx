import { Button, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import styles from '../AuthDialog.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from "react-hook-form";
import { LoginFormSchema } from '../../Api/validations';
import TextFormField from '../textField';
import { LoginDto } from '../../Api/dto';
import Alert from '@material-ui/lab/Alert';
import { setCookie } from 'nookies';
import { useState } from 'react';

import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../Api';

interface LoginFormProps {
    handleClose: () => void;
    setAuthMain: () => void;
    setAuthRegistry: () => void;
}

const AuthLogin: React.FC<LoginFormProps> = ({ setAuthMain, handleClose, setAuthRegistry }) => {

    const dispatch = useAppDispatch()
    const form = useForm({ mode: 'onChange', resolver: yupResolver(LoginFormSchema) });
    const [errorForm, setErrorForm] = useState("");

    const onSubmit = async (dto: LoginDto) => {

        try {

            setErrorForm("");
            const data = await Api().user.login(dto);
            setCookie(null, 'JRToken', data.access_token, { maxAge: 30 * 24 * 60 * 60, path: '/', })
            dispatch(setUserData(data));
            handleClose();
        }
        catch (err) {

            setErrorForm(err.response.data.message);
        }
    };

    return (<FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div onClick={setAuthMain} className={styles.authEmail}>
                <ArrowBack />
                Назад
            </div>
            <TextFormField name='email' label='Почта' />
            <TextFormField className='mb-10' name='password' label='Пароль' type='password' />
            {errorForm && <Alert severity="error">
                {errorForm}
            </Alert>}
            <div className={styles.registryAuthButton}>
                <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type='submit' className="mt-15" color="primary" variant="contained">Войти</Button>
                <Typography onClick={setAuthRegistry} className={styles.registryAuth}>Регистрация</Typography>
            </div>
        </form>
    </FormProvider>)
}

export default AuthLogin;
