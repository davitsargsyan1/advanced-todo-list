import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import store from './store';
import AppRouter from './router/AppRouter';

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff',
            borderRadius: 6,
          },
        }}
      >
        <ToastContainer />
        <AppRouter />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
