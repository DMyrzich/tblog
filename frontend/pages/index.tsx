import { MainLayout } from "../layouts/MainLayout";
import { Post } from "../components/Post";
import { Api } from "../components/Api";
import { NextPage } from 'next';
import { ResponsePost } from "../components/Api/response";
import "macro-css";

interface HomeProps {
  items: ResponsePost[];
}

const Home: NextPage<HomeProps> = ({ items }) => {

  return (
    <MainLayout>
      {
        items && items.map((e, idx) => <Post post={e} key={idx} />)
      }
    </MainLayout>
  );
};

export const getServerSideProps = async () => {

  try {

    const { items } = await Api().post.getAll();

    return {
      props: { items }
    }

  } catch (err) {
    console.log(err);
  }

  return {
    props: { posts: null }
  }
}

export default Home;