import { File } from "../../files/entities/File";

export interface IUpdateProfileDTO {
  bio: string;
  file: File;
}
