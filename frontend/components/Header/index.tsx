import React from 'react';
import styles from './Header.module.scss';

import { Paper, Button, IconButton, Avatar } from '@material-ui/core';
import Link from 'next/link';
import { ExpandMoreOutlined as ArrowBottom, SearchOutlined as SearchIcon, SmsOutlined as MessageIcon, PersonOutlineRounded as UserAuth, Menu as MenuIcon, NotificationsNoneOutlined as NotificationIcon, } from '@material-ui/icons';

import AuthDialog from '../AuthDialog';
import { selectUserData } from '../../redux/slices/user';
import { useAppSelector } from '../../redux/hooks';
import { ResponseUser } from '../Api/response';

export const Header: React.FC = () => {

  const [open, setOpen] = React.useState(false);
  const user = useAppSelector<ResponseUser | null>(selectUserData)
  const toggleFormAuth = () => { setOpen(!open); };

  return (
    <Paper className={styles.root} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href="http://localhost:8080/">
          <a>
            <svg className={styles.logo} viewBox="0 0 24 25">
              <path fill="#e8a427" d="M0 19h8.5v6H0v-6z"></path>
              <path d="M0 7h8.5v18l6.5-6V7h9V0H0v7z"></path>
              <path fill="rgba(0,0,0,0.15)" d="M7.5 19h1v6l-1-6z"></path>
            </svg>
          </a>
        </Link>
        <div className={styles.searchBlock}>
          <SearchIcon />
          <input placeholder="Поиск" />
        </div>
        <Link href="/write">
          <a>
            <Button variant="contained" className={styles.penButton}>
              Новая запись
            </Button>
          </a>
        </Link>
      </div>
      <div className="d-flex align-center">
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {
          user ? <Link href={`/profile/${user?.id}`}>
            <a className='d-flex align-center'>
              <Avatar
                className={styles.avatar}
                alt={user?.fullName}
                src={user?.avatarUrl}
              />
              <ArrowBottom />
            </a>
          </Link> : <div className={styles.authSign} onClick={toggleFormAuth}>
            <UserAuth fontSize="large" />Войти
          </div>
        }

      </div>
      <AuthDialog open={open} handleClose={toggleFormAuth} />
    </Paper >
  );
};

