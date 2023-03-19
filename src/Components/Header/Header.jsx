import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.scss'
export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar >
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 0 }}>
              <Link to='/'>Courses</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
              Course
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}