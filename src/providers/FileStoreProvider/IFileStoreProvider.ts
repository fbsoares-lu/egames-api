interface IRequest {
  file: Express.Multer.File;
}

export interface IFileStoreProvider {
  execute({ file }: IRequest): Promise<string>;
}
