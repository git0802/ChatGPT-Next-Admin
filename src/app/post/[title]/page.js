import PropTypes from 'prop-types';

import { paramCase } from 'src/utils/change-case';
import axios, { endpoints } from 'src/utils/axios';

import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Post: Details',
};

export default function PostDetailsHomePage({ params }) {
  const { title } = params;

  return <PostDetailsHomeView title={title} />;
}

export async function generateStaticParams() {
  const res = await axios.get(endpoints.post.list);

  return res.data.posts.map((post) => ({
    title: paramCase(post.title),
  }));
}

PostDetailsHomePage.propTypes = {
  params: PropTypes.shape({
    title: PropTypes.string,
  }),
};
