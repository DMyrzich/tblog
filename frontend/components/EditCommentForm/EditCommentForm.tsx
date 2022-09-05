import { Input, Button } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './EditCommentForm.module.scss';
import { Api } from '../Api';
import { Loading } from '../Loading/index';
import { ResponseComment } from '../Api/response'; 

interface EditCommentFormProps {
    commentId: number;
    commentText: string;
    ShowEditCommentForm: () => void;
    SetCommentText: (obj: ResponseComment) => void;
}

const EditCommentForm: React.FC<EditCommentFormProps> = ({ commentText, commentId, ShowEditCommentForm, SetCommentText }) => {

    const [text, setText] = useState(commentText);
    const [loading, setLoading] = useState(false);
    const [errorForm, setErrorForm] = useState("");

    const onSubmit = async () => {

        try {

            setErrorForm("");
            setLoading(true);
            const comment: ResponseComment = await Api().comment.update({ commentId, text });
            SetCommentText({ ...comment });
        }
        catch (err) {

            setErrorForm(err.response.data.message);
            console.log(errorForm);
        }
        setLoading(false);
        ShowEditCommentForm();
    };

    return (<div className={styles.form}>
        <Loading loading={loading} title="Идет процесс редактирования комментария..." />
        <Input
            onChange={(e) => setText(e.target.value)}
            value={text}
            minRows={5}
            multiline classes={{ root: styles.fieldRoot }}
            placeholder="Редактировать комментарий..."
            fullWidth
        />
        <Button onClick={onSubmit} className={styles.editButton} variant="contained" color="primary">Редактировать</Button>
        <Button onClick={ShowEditCommentForm} className={styles.editButton} variant="contained" color="primary">Закрыть</Button>
    </div>)
}

export default EditCommentForm;