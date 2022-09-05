import React, { useState, useEffect } from 'react';
import { Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { Comment } from "../Comment";
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import { ResponsePost, ResponseComment } from '../Api/response';
import { Api } from '../Api';

type PostCommentsProps = {
    post: ResponsePost;
}

function num_word(value: number, words: string[]) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return `${value} ${words[2]}`;
    if (num > 1 && num < 5) return `${value} ${words[1]}`;
    if (num == 1) return `${value} ${words[0]}`;
    return `${value} ${words[2]}`;
}

export const PostComments: React.FC<PostCommentsProps> = ({ post: { comments, id, commentsCount } }) => {

    const [comment, setComment] = useState<ResponseComment[]>(comments);
    let [comCount, setComCount] = useState<number>(commentsCount);
    const [tabs, setTabs] = useState(0);

    const getTabsComment = async (value: number) => {

        const sort = value == 0 ? 'order' : 'popular';
        const { comments, commentsCount } = await Api().post.getCommentPostId({ postId: id, sort });

        setComment(comments)
        setComCount(commentsCount)
        setTabs(value);
    }

    const deleteCom = (id: number) => {

        const arr = comment.filter((el) => el.id != id);
        setComCount(--comCount);
        setComment(arr);
    }

    const createCom = (item: ResponseComment) => {

        setComCount(++comCount);
        setComment((prev) => [...prev, item]);
    }

    return (
        <Paper elevation={0} className="mt-40 p-30">
            <div className="container">
                <Typography variant="h6" className="mb-20">
                    {
                        num_word(comCount, ['комментарий', 'комментария', 'комментариев'])
                    }
                </Typography>
                <Tabs onChange={(_, value) => getTabsComment(value)} className="mt-20" value={tabs} indicatorColor="primary" textColor="primary">
                    <Tab label="По порядку" />
                    <Tab label="Популярные" />
                </Tabs>
                <Divider />
                <AddCommentForm createCom={createCom} postId={id} />
                <div className="mb-20" />
                {
                    comment.map(com => <Comment deleteCom={deleteCom} key={com.id} propsComment={com} />)
                }
            </div>
        </Paper>
    );
};