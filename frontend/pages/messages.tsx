import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { NextPage } from 'next';

const Messages: NextPage = () => {
  return (
    <MainLayout>
      <h1>Это сообщения</h1>
    </MainLayout>
  );
}

export default Messages;