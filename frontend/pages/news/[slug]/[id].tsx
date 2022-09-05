import React from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { PostComments } from '../../../components/CommentPost/index';
import { FullPost } from "../../../components/FullPost";
import { ResponsePost } from "../../../components/Api/response";
import { GetServerSideProps } from "next";
import { Api } from "../../../components/Api";

export interface NewsProps {
  post: ResponsePost;
};

export const News: React.FC<NewsProps> = ({ post }) => {

  return (
    <MainLayout className="mb-50" contentFullWidth>
      <FullPost post={post} />
      <PostComments post={post} />
    </MainLayout>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  try {

    const { id } = ctx.params;

    const post = await Api(ctx).post.getOne(id);

    return {
      props: { post }
    }

  } catch (err) {

    console.log(err);
    return {
      props: {

      }, redirect: { destination: '/', permanent: false },
    }
  }
}

export default News;