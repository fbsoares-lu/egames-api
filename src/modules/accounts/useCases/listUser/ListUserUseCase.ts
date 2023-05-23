import { IPaginationResponse } from "../../../../helpers/PaginationResponse";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  page?: number;
  pageSize?: number;
}

export class ListUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({
    page,
    pageSize,
  }: IRequest): Promise<IPaginationResponse> {
    if (!page) page = 1;
    if (!pageSize) pageSize = 10;

    const paginationResponse = await this.userRepository.find(page, pageSize);
    return paginationResponse;
  }
}
