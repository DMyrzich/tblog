import React from 'react';
import { Button } from "@material-ui/core";
import { useRouter } from 'next/dist/client/router';
import styles from './WriteForm.module.scss';
import { UpdatePostProps } from '.';

interface InfoMessageProps {
    data: UpdatePostProps;
    title: string
}

export const InfoMessage: React.FC<InfoMessageProps> = ({ data, title }) => {

    const route = useRouter();

    const OnWall = (path: string) => {

        route.push(path);
    }

    return (
        <div className='p-15'>
            <b className={styles.info_messages_text}>Ваш пост {data?.text} успешно!</b>
            <div className={styles.info_messages_title}>{title}...</div>
            <div className='d-flex'>
                <Button onClick={() => OnWall(`/news/post/${data?.id}`)} variant="contained" color="primary">
                    Посмотреть запись
                </Button>
                <Button className='ml-25' onClick={() => OnWall(`/write/${data?.id}`)} variant="contained" color="primary">
                    Редактировать запись
                </Button>
            </div>
        </div>
    );
};