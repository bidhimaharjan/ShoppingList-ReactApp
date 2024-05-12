import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URL } from "../utils";

export const UpdateItemForm = ({
  fetchItems,
  isDialogOpen,
  setIsDialogOpen,
  item,
}) => {
  const { id, completed } = item;
  const [itemName, setItemName] = useState("");

  const handleUpdateItemName = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name: itemName,
        completed,
      });

      await fetchItems();

      setItemName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit Item</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label="Shopping Item"
          variant="outlined"
          onChange={(e) => setItemName(e.target.value)}
        />
        
        <Button
          variant="contained"
          onClick={async () => {
            await handleUpdateItemName();
            
            setIsDialogOpen(false);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};