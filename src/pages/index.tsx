import { Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import Header, { HEADER_HIGHT } from '../components/header';
import PostCard, { Post } from '../components/PostCard';

const posts: Post[] = [
  {
    id: 1,
    title: '이승건의 블로그에 오신것을 환영합니다.',
    bodySummary: '잘왔다 이것들아!',
    date: '2021-07-18',
    tags: ['tag1', 'tag2'],
  },
  {
    id: 2,
    title: '두번째 블로그 글 입니다.',
    bodySummary: '잘왔다 이것들아!!',
    date: '2021-07-18',
    tags: ['tag2', 'tag3'],
  },
];

// markup
const IndexPage = () => {
  return (
    <Box>
      <Header />
      <Box paddingTop={`${HEADER_HIGHT}px`}>
        <Container>
          {posts.map((post) => (
            <Box key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default IndexPage;
