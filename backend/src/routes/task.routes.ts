import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updatedTask,
  deleteTask,
} from "../controllers/task.controller";
import { validateObjectId } from "../middlewares/validateObjectId";

const router = Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", validateObjectId, getTaskById);
router.put("/:id", validateObjectId, updatedTask);
router.delete("/:id", validateObjectId, deleteTask);

export default router;
