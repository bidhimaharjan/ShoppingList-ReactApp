import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { API_URL } from "../utils";

export const AddItemForm = ({ fetchItems }) => {
    const [newItem, setNewItem] = useState("");

    const addNewItem = async () => {
        try {
          await axios.post(API_URL, {
            name: newItem,
            completed: false,
          });
    
          await fetchItems();
    
          setNewItem("");
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div>
            <Typography align='center' variant='h3' paddingTop={6} paddingBottom={4}>
                My Shopping List
            </Typography>
            <div className='addItemForm'>
                <TextField 
                    size="small"
                    sx={{ width: "300px" }}
                    label="Shopping Item" 
                    variant="outlined" 
                    value={newItem} 
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <Button 
                  disabled={!newItem.length} 
                  variant="outlined"
                  sx={{ 
                      height: "40px", 
                      marginLeft: '8px',                     
                      bgcolor: 'success.dark',
                      '&:hover': { 
                          bgcolor: 'success.main',
                      }
                  }} 
                  onClick={addNewItem}
                  style={{ color: 'white' }}
                >
                  <AddIcon />
                  Add
                </Button>
            </div>
        </div>
    );
};
