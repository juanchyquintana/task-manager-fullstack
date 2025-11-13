import { Router } from "express";
import { 
    createUser, 
    getUserById, 
    getUsers,
    updateUser,
    deleteUser
} from "../controllers/user.controller";
import { validateObjectId } from "../middlewares/validateObjectId";

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', validateObjectId, getUserById);
router.put('/:id', validateObjectId, updateUser);
router.delete('/:id', validateObjectId, deleteUser)

export default router;