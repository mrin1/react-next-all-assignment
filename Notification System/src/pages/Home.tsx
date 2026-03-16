import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Paper, Badge, IconButton } from '@mui/material';
import { 
  CheckCircleOutline, 
  ErrorOutline, 
  WarningAmber, 
  InfoOutlined, 
  NotificationsActive 
} from '@mui/icons-material';

import ActionCard from '../components/ActionCard';
import NotificationDrawer from '../components/NotificationDrawer';
import { useNotify } from '../hooks/useNotify';
import { useAppSelector } from '../hooks/utils/redux';

const Home: React.FC = () => {
  const toast = useNotify();
  const { queue } = useAppSelector((state) => state.notifications);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 8 }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, borderRadius: 6, textAlign: 'center', bgcolor: 'white' }}>
          
          <Box sx={{ mb: 4 }}>
            <IconButton onClick={() => setIsDrawerOpen(true)} sx={{ p: 2 }}>
              <Badge badgeContent={queue.length} color="error">
                <NotificationsActive sx={{ fontSize: 50, color: '#3b82f6' }} />
              </Badge>
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Click icon to view history
            </Typography>
          </Box>

          <Typography variant="h4" fontWeight={800} gutterBottom>
            Notification System
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <ActionCard 
              title="Success" color="#10b981" icon={CheckCircleOutline}
              desc="Task completed perfectly."
              onClick={() => toast.success('Connection Successful!')}
            />
            <ActionCard 
              title="Error" color="#ef4444" icon={ErrorOutline}
              desc="Something went wrong."
              onClick={() => toast.error('Connection Failed!')}
            />
            <ActionCard 
              title="Warning" color="#f59e0b" icon={WarningAmber}
              desc="Check your settings."
              onClick={() => toast.warn('Low disk space!')}
            />
            <ActionCard 
              title="Info" color="#3b82f6" icon={InfoOutlined}
              desc="General update."
              onClick={() => toast.info('System Update available.')}
            />
          </Grid>
        </Paper>
        <NotificationDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          queue={queue} 
        />
      </Container>
    </Box>
  );
};

export default Home;