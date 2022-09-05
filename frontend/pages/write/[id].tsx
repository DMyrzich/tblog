import type { GetServerSideProps, NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { WriteForm } from '../../components/WriteForm/index';
import { Api } from "../../components/Api/";
import { ResponsePost } from '../../components/Api/response';
import "macro-css";

interface WriteFormProps {
    post?: ResponsePost
}

const WritePage: NextPage<WriteFormProps> = ({ post }) => {

    return (
        <MainLayout className="main-layout-white" hideComments hideMenu>
            <WriteForm post={post} />
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    try {

        const { id } = ctx.params;
        const post = await Api(ctx).post.getOne(id);
        const user = await Api(ctx).user.profile();

        if (post.author.id != user.id) {
            return {
                props: {

                }, redirect: { destination: '/', permanent: false },
            }
        }

        return {
            props: { post }
        }

    } catch (err) {
        return {
            props: {

            }, redirect: { destination: '/', permanent: false },
        }
    }
}

export default WritePage;
