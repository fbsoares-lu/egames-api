import { User } from "../entities/User";

interface IUserFormData {
  name: string;
  email: string;
}

export abstract class IUserRepository {
  abstract find(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract update(user: User, payload: IUserFormData): Promise<User>;
  abstract delete(user: User): Promise<void>;
}
