import { Box, Card, CardContent, Typography } from '@material-ui/core';
import React, { FC, useCallback, useState } from 'react';

export type Post = {
  id: number;
  title: string;
  bodySummary: string;
  date: string;
  tags: string[];
};

type Props = { post: Post };

const PostCard: FC<Props> = ({ post }) => {
  const [elevation, setElevation] = useState(0);
  const handleMouseOver = useCallback(() => {
    setElevation(1);
  }, [setElevation]);
  const handleMouseOut = useCallback(() => {
    setElevation(0);
  }, [setElevation]);

  return (
    <Card
      elevation={elevation}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CardContent>
        <Typography variant="h3">{post.title}</Typography>
        <Typography variant="body1">{post.bodySummary}</Typography>
        <Box mt={3} display="flex" flexDirection="row">
          <Typography variant="body1">{post.date}</Typography>
          {post.tags.map((tag) => (
            <Typography key={tag}>{tag}</Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
export default PostCard;
