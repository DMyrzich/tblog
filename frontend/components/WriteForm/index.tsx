import React from 'react';
import { Button, Input } from "@material-ui/core";
import dynamic from "next/dynamic";

import styles from './WriteForm.module.scss';
import { OutputBlockData } from '@editorjs/editorjs';
import { Api } from '../Api';
import { ResponsePost } from '../Api/response';
import { InfoMessage } from './info-messege';

const Editor = dynamic(async () => {

    const m = await import('../editor');
    return m.Editor;

}, { ssr: false });

interface WriteFormProps {
    post?: ResponsePost
}

export type UpdatePostProps = { text: 'отправлен' | 'сохранен', id: number } | null;

export const WriteForm: React.FC<WriteFormProps> = ({ post }) => {

    const [title, setTitle] = React.useState(post?.title || '');
    const [errorForm, setErrorForm] = React.useState('');
    const [data, setData] = React.useState<UpdatePostProps>(null);
    const [body, setBody] = React.useState<OutputBlockData[]>(post?.body || []);

    const onSubmit = async () => {

        try {

            setErrorForm('');
            if (post) {

                const { id } = await Api().post.update(post.id, { title, body });
                setData({ text: 'сохранен', id });
            }
            else {

                const { id } = await Api().post.create({ title, body });
                setData({ text: 'отправлен', id });
            }
        }
        catch (err) {

            setData(null);
            console.log(err);
            setErrorForm(err.response.data.message);
        }
    };

    return (
        <>
            {
                data ?
                    <InfoMessage data={data} title={title} /> :
                    <>
                        <div className='d-flex'>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} classes={{ root: styles.titleField }} placeholder="Заголовок" />
                            <Button disabled={!title.length || !body.length} className='ml-25' onClick={onSubmit} variant="contained" color="primary">
                                {post ? 'Редактировать' : 'Опубликовать'}
                            </Button>
                        </div>
                        <div className={styles.editor}>
                            <Editor blocks={body} setBody={arr => setBody(arr)} />
                        </div>
                    </>
            }
        </>
    );
};