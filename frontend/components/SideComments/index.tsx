import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';
import SideCommentItem from '../SideCommentItem/index';
import clsx from 'clsx';
import styles from './SideComments.module.scss';
import { ResponseComment } from '../Api/response';

interface SideCommentsProps {
  comments?: ResponseComment[]
}

const SideComments: React.FC<SideCommentsProps> = ({ comments }) => {

  const [visible, setVisible] = React.useState(true);

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      <h3 onClick={() => setVisible(!visible)}>
        Комментарии <ArrowRightIcon />
      </h3>
      {
        visible && comments && comments.map((com, idx) => <SideCommentItem key={idx} comment={com} />)
      }
    </div>
  );
};

export default SideComments;

