import React, { useState } from 'react';
import { Typography, IconButton, MenuItem, Menu } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';
import LikeCom from '@material-ui/icons/Favorite';

import styles from './Comment.module.scss';
import { ResponseComment } from '../Api/response';
import { getTime } from '../../utils/utils';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { Api } from '../Api';
import { Loading } from '../Loading';
import EditCommentForm from '../EditCommentForm/EditCommentForm';

interface CommentPostProps {
  propsComment: ResponseComment
  deleteCom: (id: number) => void;
}

export const Comment: React.FC<CommentPostProps> = ({ propsComment, deleteCom }) => {

  const [{ text, createAt, updateAt, id: commentId, likeCount, isLike }, setComment] = useState(propsComment);

  const { user: { avatarUrl, fullName, id } } = propsComment;

  const userData = useAppSelector(selectUserData)
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorForm, setErrorForm] = useState("");
  const [loading, setLoading] = useState(false);
  const [IsComEdit, setIsComEdit] = useState(false);

  const DeleteComment = async () => {

    try {

      setLoading(true);
      setErrorForm("");
      await Api().comment.delete(commentId);
      deleteCom(commentId);
    }
    catch (err) {

      setErrorForm(err.response.data.message);
      console.warn(errorForm);
    }
    handleClose();
    setLoading(false);
  }

  const LikeComment = async () => {

    try {

      setLoading(true);
      setErrorForm("");
      const comment = await Api().comment.like({ commentId });
      setComment(comment);
    }
    catch (err) {

      setErrorForm(err.response.data.message);
      console.warn(errorForm);
    }
    setLoading(false);
  }

  const handleClick = (event) => { setAnchorEl(event.currentTarget); };

  const handleClose = () => { setAnchorEl(null); };

  const ShowEditCommentForm = () => {
    setAnchorEl(null);
    setIsComEdit(!IsComEdit);
  };

  const SetCommentText = (obj: ResponseComment) => { setComment(obj); };

  return (
    <div className={styles.comment}>
      <Loading loading={loading} title="Идет процесс удаления комментария..." />
      <div className={styles.userInfo}>
        <img src={avatarUrl} alt={fullName} />
        <b>{fullName}</b>
        <span>{getTime(createAt)}</span>
        {
          updateAt && <span>(ред {getTime(updateAt).toLocaleLowerCase()})</span>
        }
      </div>
      {
        !IsComEdit && <Typography className={styles.text}>
          {text}
        </Typography>
      }
      {
        IsComEdit && userData &&
        <EditCommentForm
          commentId={commentId}
          commentText={text}
          SetCommentText={SetCommentText}
          ShowEditCommentForm={ShowEditCommentForm}>
        </EditCommentForm>
      }

      <div className={styles.actionBtn}>
        <span className={styles.replyBtn}>Ответить</span>
        <IconButton onClick={handleClick}>
          <MoreIcon />
        </IconButton>
        <IconButton style={{ padding: 0 }} onClick={LikeComment}>
          <LikeCom color={isLike ? 'secondary' : 'action'} />
        </IconButton>
        {
          likeCount > 0 && <span>{likeCount}</span>
        }
      </div>

      <Menu
        anchorEl={anchorEl}
        elevation={2}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted>
        {
          userData?.id == id && <MenuItem key={1} onClick={DeleteComment}>Удалить</MenuItem>
        }
        {
          userData?.id == id && <MenuItem key={2} onClick={ShowEditCommentForm}>Редактировать</MenuItem>
        }
        <MenuItem onClick={handleClose}>Пожаловаться</MenuItem>
      </Menu>
    </div >
  );
};