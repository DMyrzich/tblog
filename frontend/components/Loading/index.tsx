import { CircularProgress, DialogTitle, Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import * as React from 'react';

import styles from './Loading.module.scss';

interface LoadingProps {

  loading: boolean;
  title: string;
}

export const Loading: React.FC<LoadingProps> = ({ title, loading }) => {

  return (<>
    <Dialog
      open={loading}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={styles.loading} id="alert-dialog-description">
          <CircularProgress style={{ marginBottom: 20 }} disableShrink />
          Пожалуйста, дождитесь окончания процесса загрузки.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  </>
  );
};



