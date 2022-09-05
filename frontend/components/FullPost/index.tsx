import { Button, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { PostActions } from '../postActions';
import MessageIcon from '@material-ui/icons/TextsmsOutlined';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';

import styles from './FullPost.module.scss';
import { NewsProps } from '../../pages/news/[slug]/[id]';
import { Api } from '../Api';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

interface FullPostProps extends NewsProps { };

export const FullPost: React.FC<FullPostProps> = ({ post }) => {

  const { title, body, author } = post;
  const [errorForm, setErrorForm] = useState("");
  const [subscribe, setSubscribe] = useState(author["isFollower"]);
  const userData = useAppSelector(selectUserData)

  const Subscribe = async () => {

    try {

      setErrorForm("");
      const userId = author["id"];
      const { isFollower } = await Api().user.subscribe({ userId });
      setSubscribe(isFollower);
    }
    catch (err) {

      setErrorForm(err.response.data.message);
    }
  }

  return (
    <Paper elevation={0} className={styles.paper}>
      <div className="container">
        <Typography variant="h4" className={styles.title}>
          {title}
        </Typography>
        <div>
          {
            body.map(obj => <Typography key={obj.id}>{obj.data.text}</Typography>)
          }
          <div style={{ width: 250, marginLeft: -14 }}>
            <PostActions />
          </div>
          <div className="d-flex justify-between align-center mt-30 mb-30">
            <div className={styles.userInfo}>
              <img src={author.avatarUrl} alt={author.fullName} />
              <b>{author.fullName}</b>
              <span>+1685</span>
            </div>
            <div>
              <Button variant="contained" className="mr-15">
                <MessageIcon />
              </Button>
              <Button disabled={author.id == userData?.id} onClick={Subscribe} variant="contained">
                <UserAddIcon />
                <b style={{ width: 115 }} className="ml-10">{subscribe ? "Отписаться" : "Подписаться"}</b>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};