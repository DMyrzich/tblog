import { Avatar, Button, Link, Paper, Tabs, Tab, Typography, } from "@material-ui/core";
import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { SettingsOutlined as SettingsIcon, TextsmsOutlined as MessageIcon, } from "@material-ui/icons";
import { Post } from '../../components/Post/index';
import { Api } from "../../components/Api";
import { ResponseUser } from '../../components/Api/response';
import { GetServerSideProps } from "next";

interface ProfileProps {
  user: ResponseUser
}

const Profile: React.FC<ProfileProps> = ({ user }) => {

  const { fullName, avatarUrl, followersCount } = user;

  return (
    <MainLayout contentFullWidth hideComments>
      <Paper className="pl-20 pr-20 pt-20 mb-30" elevation={0}>
        <div className="d-flex justify-between">
          <div>
            <Avatar
              style={{ width: 120, height: 120, borderRadius: 6 }}
              alt={fullName}
              src={avatarUrl} />
            <Typography
              style={{ fontWeight: "bold" }}
              className="mt-10"
              variant="h4">
              {fullName}
            </Typography>
          </div>
          <div>
            <Link href="/profile/settings">
              <Button
                style={{ height: 42, minWidth: 45, width: 45, marginRight: 10 }}>
                <SettingsIcon />
              </Button>
            </Link>
            <Button style={{ height: 42 }} variant="contained" color="primary">
              <MessageIcon />
              Написать
            </Button>
          </div>
        </div>
        <div className="d-flex mb-10 mt=10">
          <Typography
            style={{ fontWeight: "bold", color: "#35AB66" }}
            className="mr-15">
            +208
          </Typography>
          <Typography>+2 подписчика</Typography>
        </div>
        <Typography>На проекте c 29 августа 2021</Typography>
        <Tabs
          className="mt-20"
          value={0}
          indicatorColor="primary"
          textColor="primary">
          <Tab label="Статьи" />
          <Tab label="Комментарии" />
          <Tab label="Закладки" />
        </Tabs>
      </Paper>
      <div className="d-flex align-start">
        <div className="flex mr-20">
          {/*  <Post /> */}
        </div>
        <Paper style={{ width: 300 }} className="p-20 mb-20" elevation={0}>
          <b>Подписчики</b>
          <div className="d-flex mt-15">
            <Avatar className="mr-10" src="" />
            <Avatar className="mr-10" src="" />
          </div>
        </Paper>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  try {

    const { id } = ctx.query;
    const user = await Api(ctx).user.profile(id);

    return {
      props: { user }
    }

  } catch (err) {

    console.log(err);
    return {
      props: { user: null }
    }
  }
}

export default Profile;
