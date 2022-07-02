/**
 * メインコンポーネント
 */

import React, { ReactElement, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import './App.css';
import Home from './component/pages/Home';
import Upload from './component/pages/Upload';
import Execute from './component/pages/Execute';
import NoPage from './component/pages/NoPage';
import UseStyles from './component/common/UseStyles';
import Web3Menu from './component/common/Web3Menu';
import Routers from './component/common/Router';

/**
 * Router コンポーネント用の引数のインターフェース
 */
interface Props {
  path: string | undefined;
  component: any;
  exact: boolean;
}

/**
 * Appコンポーネント
 */
function App():ReactElement {

  // スタイル用の変数
  const classes = UseStyles()

  return (
    <Router>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
            OCRデモアプリ
          </Typography>
          <Typography variant="h6" color="inherit">
            <Web3Menu/>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Upload" element={<Upload/>} />
          <Route path="/Execute" element={<Execute/>} />
          <Route path="/*" element={<NoPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
