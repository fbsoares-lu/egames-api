import { UserRepository } from "../../repositories/implementation/UserRepository";
import { ShowUserController } from "./ShowUserController";
import { ShowUserUseCase } from "./ShowUserUseCase";

const userRepository = new UserRepository();
const showUserUseCase = new ShowUserUseCase(userRepository);
const showUserController = new ShowUserController(showUserUseCase);

export { showUserController };
