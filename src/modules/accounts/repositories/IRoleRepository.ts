import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export abstract class IRoleRepository {
  abstract create(role: ICreateUserDTO): Promise<void>;
}
