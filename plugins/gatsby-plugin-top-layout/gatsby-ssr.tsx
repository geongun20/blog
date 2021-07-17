/* eslint-disable import/no-extraneous-dependencies */
import React, { FC } from 'react';
import TopLayout from './TopLayout';

export const wrapRootElement: FC<any> = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};
