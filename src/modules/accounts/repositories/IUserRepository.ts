import { IPaginationResponse } from "../../../helpers/PaginationResponse";
import { Permission } from "../entities/Permission";
import { Profile } from "../entities/Profile";
import { Role } from "../entities/Role";
import { User } from "../entities/User";

interface IUserFormData {
  name: string;
  email: string;
}

export abstract class IUserRepository {
  abstract find(page: number, pageSize: number): Promise<IPaginationResponse>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract update(user: User, payload: IUserFormData): Promise<User>;
  abstract delete(user: User): Promise<void>;
  abstract save(
    user: User,
    roles: Role[],
    permissions: Permission[]
  ): Promise<void>;
  abstract saveProfile(user: User, profile: Profile): Promise<void>;
}
