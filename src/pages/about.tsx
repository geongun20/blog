import { Box, Divider, Typography } from '@material-ui/core';
import React from 'react';
import Header, { HEADER_HIGHT } from '../components/header';

const AboutPage = () => {
  return (
    <Box>
      <Header />
      <Box paddingTop={`${HEADER_HIGHT}px`}>
        <Typography variant="h2">이승건</Typography>
        <Typography variant="body1">
          기술, 소프트웨어, 스타트업에 관심이 많습니다.
        </Typography>
        <Typography variant="body1" />
        <Typography variant="body1">
          개인보다 조직의 관점에서 사고합니다.
        </Typography>
        <Typography variant="body1">
          이성적이지만 사람의 마음을 소중하게 생각합니다.
        </Typography>
        <Divider />
        <Typography variant="body1">
          경기과학고등학교를 졸업하고 서울대학교에 원자핵공학과에 입학했습니다.
        </Typography>
        <Typography variant="body1">
          컴퓨터공학부로 전과하였고 4학년 때 총학생회에서 일했습니다.
        </Typography>
        <Typography variant="body1">
          2019년 12월부터 지금까지 플링크팀에서 일하고 있습니다.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutPage;
