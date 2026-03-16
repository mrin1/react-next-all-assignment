import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { store } from './hooks/reduxToolkit/store/store';
import { theme } from './theme/theme';
import Layout from './components/layout/Wrapper';
import QuizPage from './pages/QuizPage';
import './App.css';
//import './index.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Layout>
            <QuizPage />
          </Layout>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;