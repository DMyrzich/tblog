import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Image from 'next/image';

import styles from './Post.module.scss';
import Link from 'next/link';
import { PostActions } from '../postActions';
import { ResponsePost } from '../Api/response';

interface PostProps {
  post: ResponsePost
};

export const Post: React.FC<PostProps> = ({ post }) => {

  const { title, description, id, imgUrl } = post;

  return (
    <Link href={`/news/post/${id}`}>
      <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
        <Typography variant="h5" className={styles.title}>
          <a>{title}</a>
        </Typography>
        <Typography className="mt-10 mb-15">
          {description}
        </Typography>
        <Image
          alt={title}
          src={imgUrl || "https://leonardo.osnova.io/a21ca5a9-d95b-560d-9a6f-9fa87eff7fcd/-/preview/600/-/format/webp/"}
          height={500}
          width={600} />
        <PostActions />
      </Paper >
    </Link >
  );
};
