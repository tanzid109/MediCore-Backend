import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";
import { UserValidation } from "./auth.validation";
import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.post(
	"/register",
	//   (req: Request, res: Response, next: NextFunction) => {
	//     try {
	//       const payload = req.body ?? {};
	//       const result =
	//         PatientValidation.PatientRegistrationSchema.safeParse(payload);

	//       if (!result.success) {
	//         console.log(result.error);
	//         console.log(result.error.issues);
	//         throw new Error(result.error.message);
	//       }

	//       req.body = result.data;

	//       next();
	//     } catch (error) {
	//       next(error);
	//     }
	//   },

	validateRequest(UserValidation.PatientRegistrationSchema),
	AuthController.registerPatient,
);
router.post(
	"/login",
	validateRequest(UserValidation.loginSchema),
	AuthController.loginUser,
);
router.get(
	"/me",
	auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
	AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
export const AuthRoutes = router;
