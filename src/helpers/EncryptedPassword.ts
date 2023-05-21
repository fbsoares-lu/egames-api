import bcrypt from "bcrypt";

export class EncryptedPassword {
  static async handle(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
