import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "db.json");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const readDB = async () => {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
};

const writeDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
};

app.get("/todos", async (req, res) => {
  try {
    console.log("So'rov keldi");
    const db = await readDB();
    res.json(db.todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const db = await readDB();
    const todo = db.todos.find((t) => t.id === req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo topilmadi" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { title, description, completed = false } = req.body;
    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "title majburiy va string bo'lishi kerak" });
    }
    const db = await readDB();
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: Boolean(completed),
    };
    db.todos.push(newTodo);
    await writeDB(db);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const db = await readDB();
    const index = db.todos.findIndex((t) => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Todo topilmadi" });

    const { title, description, completed } = req.body;
    const updated = {
      ...db.todos[index],
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(completed !== undefined && { completed: Boolean(completed) }),
    };
    db.todos[index] = updated;
    await writeDB(db);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const db = await readDB();
    const index = db.todos.findIndex((t) => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Todo topilmadi" });

    const [deleted] = db.todos.splice(index, 1);
    await writeDB(db);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server ishlamoqda: http://localhost:${PORT}`);
});
