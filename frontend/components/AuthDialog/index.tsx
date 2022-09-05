import { Dialog, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import styles from './AuthDialog.module.scss';
import React, { useState } from 'react';
import { CloseOutlined as CloseButton, } from '@material-ui/icons/';
import Main from './Forms/main';
import AuthLogin from './Forms/login';
import RegistryAuth from './Forms/registry';


interface AuthDialogProps {
    open: boolean; 
    handleClose: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ open, handleClose }) => {

    const [auth, setAuth] = useState<'main' | 'login' | 'registry'>('main');

    return (
        <Dialog open={open} onClose={handleClose}  fullWidth maxWidth="xs">
            <DialogContent>
                <DialogContentText>
                    <div className={styles.content}>
                        <CloseButton onClick={handleClose} className={styles.closeAuth} />
                        <Typography className={styles.title}>Вход в аккаунт</Typography>
                        {
                            auth == 'main' && <Main setAuth={() => setAuth('login')} />
                        }
                        {
                            auth == 'login' && <AuthLogin handleClose={handleClose} setAuthRegistry={() => setAuth('registry')} setAuthMain={() => setAuth('main')} />
                        }
                        {
                            auth == 'registry' && <RegistryAuth setAuthBack={() => setAuth('login')} />
                        }
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog >
    );
}

export default AuthDialog;