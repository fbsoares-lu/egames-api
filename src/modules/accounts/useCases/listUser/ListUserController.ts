import { Request, Response } from "express";
import { ListUserUseCase } from "./ListUserUseCase";

export class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const { page } = request.query;
    const { pageSize }: { pageSize?: number } = request.query;

    const convertPageToNumber = Number(page);
    const convertPageSizeToNumber = Number(pageSize);

    const responsePagination = await this.listUserUseCase.execute({
      page: convertPageToNumber,
      pageSize: convertPageSizeToNumber,
    });

    return response.status(200).json(responsePagination);
  }
}
