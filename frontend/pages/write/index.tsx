import type { NextPage } from "next";
import "macro-css";
import { MainLayout } from "../../layouts/MainLayout";
import { WriteForm } from '../../components/WriteForm/index';
import { ResponsePost } from "../../components/Api/response";

interface WriteFormProps {
    post?: ResponsePost;
}

const WritePage: NextPage<WriteFormProps> = ({ post }) => {

    return (
        <MainLayout className="main-layout-white" hideComments hideMenu>
            <WriteForm />
        </MainLayout>
    )
}
export default WritePage;
