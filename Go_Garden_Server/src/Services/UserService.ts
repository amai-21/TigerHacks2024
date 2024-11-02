import User, { IUser } from "../Schemas/User";

export const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};
