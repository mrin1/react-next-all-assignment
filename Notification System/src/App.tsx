import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { store } from './hooks/redux-toolkit/store/store';
import NotificationProvider from './components/NotificationProvider';
import NotificationDemo from './pages/Home';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <NotificationProvider/>
      <NotificationDemo />
    </Provider>
  );
};

export default App;