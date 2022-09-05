import React from 'react';

import styles from './SideCommentItem.module.scss';
import { Link } from '@material-ui/core';
import { ResponseComment } from '../Api/response';

interface SideCommentItemProps {
    comment: ResponseComment;
}

const SideCommentItem: React.FC<SideCommentItemProps> = ({ comment }) => {

    const { user, text, post } = comment;

    return (<div className={styles.commentItem}>
        <div className={styles.userInfo}>
            <img alt="photo" src={user.avatarUrl} />
            <Link href={`/profile/${user.id}`}>
                <b>{user.fullName}</b>
            </Link>
        </div>
        <p className={styles.text}>{text}</p>
        <Link href={`/news/post/${post.id}`}>
            <span className={styles.postTitle}>{post.title}</span>
        </Link>
    </div>
    );
};

export default SideCommentItem