import { Router } from "express";
import { checkAuth } from "../../middleWares/checkAuth";
import { validateRequest } from "../../middleWares/validateRequest";
import {
  createUserZodSchema,
  updateUserZodSchema,
} from "../../utils/user.validation";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interface";
const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

router.get(
  "/all-users",
  checkAuth(Role.GUIDE, Role.SUPER_ADMIN),
  UserControllers.getAllUsers
);
router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserControllers.updateUser
);

export const UserRoutes = router;
