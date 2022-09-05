import { Input, Button } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './AddCommentForm.module.scss';
import { CreateCommentsDto } from '../Api/dto';
import { Api } from '../Api/';
import { Loading } from '../Loading/index';
import { ResponseComment } from '../Api/response';
import { selectUserData } from '../../redux/slices/user';
import { useAppSelector } from '../../redux/hooks';

interface AddCommentFormProps {
    postId: number;
    createCom: (item: ResponseComment) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId, createCom }) => {

    const [click, setClick] = useState(false);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorForm, setErrorForm] = useState("");
    const userData = useAppSelector(selectUserData)

    const onSubmit = async () => {

        try {

            setErrorForm("");
            setLoading(true);
            const comment: ResponseComment = await Api().comment.create({ postId, text });
            //  setComment((prev) => [...prev, comment]);
            createCom(comment);
        }
        catch (err: any) {

            console.log(err);
            setErrorForm(err.response.data.message);
        }
        setText('');
        setClick(false);
        setLoading(false);
    };

    return (userData && <div className={styles.form}>
        <Loading loading={loading} title="Идет процесс публикации комментария..." />
        <Input
            onChange={(e) => setText(e.target.value)}
            value={text}
            onFocus={() => setClick(true)}
            minRows={click ? 5 : 1}
            multiline classes={{ root: styles.fieldRoot }}
            placeholder="Написать комментарий..."
            fullWidth
        />
        {
            click && <Button onClick={onSubmit} className={styles.addButton} variant="contained" color="primary">
                Опубликовать
            </Button>
        }
    </div >)
}

export default AddCommentForm;