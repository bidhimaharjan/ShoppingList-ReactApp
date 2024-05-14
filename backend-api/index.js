import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { fetchItems, createItems, updateItems, deleteItems } from "./item.js";

const app = express();
const port = 3001;

// Middlewares
app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

// Routes
// Route handler for the root endpoint
app.get('/', (req, res) => {
  const apiInfo = {
    message: 'Welcome to the Node.js CRUD API',
    version: '1.0',
    routes: {
      items: '/item', // Endpoint for managing shopping items
    }
  };
  res.json(apiInfo);
});

app.get("/item", async (req, res) => {
  try {
    const items = await fetchItems();

    res.send(items.Items);
  } catch (err) {
    res.status(400).send(`Error fetching items: ${err}`);
  }
});

app.post("/item", async (req, res) => {
  try {
    const item = req.body;

    const response = await createItems(item);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating item: ${err}`);
  }
});

app.put("/item", async (req, res) => {
  try {
    const item = req.body;

    const response = await updateItems(item);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating item: ${err}`);
  }
});

app.delete("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deleteItems(id);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error deleting item: ${err}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

export const handler = serverless(app);