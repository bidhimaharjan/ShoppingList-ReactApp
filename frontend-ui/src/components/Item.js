import { Button, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdateItemForm } from './UpdateItemForm'
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

export const Item = ({ item, fetchItems }) => {
  const { id, name, completed } = item;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateItemCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`${API_URL}/${item.id}`);

      await fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="item">
      <div className={classnames("flex", {done: isComplete,})}>
        <Checkbox checked={isComplete} onChange={handleUpdateItemCompletion} />
        <Typography variant="h5" paddingTop={0.7}>{name}</Typography>
      </div>

      <div className="itemButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
          Edit
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteItem}>
          <DeleteIcon />
          Delete
        </Button>
      </div>

      <UpdateItemForm
        fetchItems={fetchItems}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        item={item}
      />
    </div>
  );
};
