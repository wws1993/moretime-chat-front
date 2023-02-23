/*
 * @Author: 武文帅 15696141050@163.com
 * @Date: 2022-12-31 16:51:33
 * @LastEditors: wws1993 15696141050@163.com
 * @LastEditTime: 2023-02-23 11:13:32
 * @FilePath: \moretime-chat-front\src\main.tsx
 * @Description: 根目录
 * IE6腦殘粉
 * Copyright (c) 2022 by wws1993<15696141050@163.com>, All Rights Reserved. 
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import '@less/common.less'
import { routeMap } from './scripts/router'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const screenAdapt = () => {
  import('@third/ydui.flexible.js')
  document.body.classList.add('m')
  document.body.style.fontSize = '.32rem'
}

screenAdapt();

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>
  <HashRouter>
    <Routes>
      {routeMap.map(item => <Route path={item.p} key={item.p} element={ item.c } />)}
    </Routes>
  </HashRouter>

  <ToastContainer />
</React.StrictMode>);
