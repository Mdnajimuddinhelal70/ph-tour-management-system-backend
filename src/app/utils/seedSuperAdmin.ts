/* eslint-disable no-console */
import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { IAuthProvider } from "./../modules/user/user.interface";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExists = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExists) {
      console.log("Super admin already exists");
      return;
    }

    console.log("Try to create super admin");

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.DB_URL)
    );
    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };
    const payload: IUser = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
    };

    const superadmin = await User.create(payload);
    console.log("Super admin created successfully! \n");
    console.log(superadmin);
  } catch (error) {
    console.log(error);
  }
};
