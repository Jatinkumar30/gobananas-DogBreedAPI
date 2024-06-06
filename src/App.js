import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, List, ListItem, ListItemText, CircularProgress, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://api.thedogapi.com/v1/breeds')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the data', error);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dog Breeds Viewer</Typography>
        </Toolbar>
      </AppBar>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {filteredData.map(item => (
            <ListItem key={item.id} divider>
              <ListItemText 
                primary={item.name} 
                secondary={`Breed Group: ${item.breed_group || 'N/A'}\nLife Span: ${item.life_span}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default App;
