import { Button, Divider, Paper, TextField, Typography, } from "@material-ui/core";
import React from "react";
import { MainLayout } from "../../layouts/MainLayout";

const Settings = () => {
  return (
    <MainLayout>
      <Paper className="p-20">
        <Typography variant="h6">Основные настройки</Typography>
        <Divider className="mt-20 mb-30" />
        <form>
          <TextField
            className="mb-20"
            size="small"
            label="Никнейм"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            className="mb-20"
            size="small"
            label="Эл почта"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            size="small"
            label="пароль"
            variant="outlined"
            fullWidth
            required
          />
          <Divider className="mt-20 mb-30" />
          <Button color="primary" variant="contained">
            Сохранить изменения
          </Button>
        </form>
      </Paper>
    </MainLayout>
  );
};

export default Settings;
