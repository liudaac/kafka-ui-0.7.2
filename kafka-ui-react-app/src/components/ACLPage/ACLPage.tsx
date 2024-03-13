import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ACList from 'components/ACLPage/List/List';
import { clusterAclNewRelativePath } from 'lib/paths';

import New from './New/New';

const ACLPage = () => {
  return (
    <Routes>
      <Route index element={<ACList />} />
      <Route path={clusterAclNewRelativePath} element={<New />} />
    </Routes>
  );
};

export default ACLPage;
