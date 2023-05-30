import { Repository } from "typeorm";
import { AppDataSource } from "../../../../infra/database";
import { IRecoveryTokenRepository } from "../IRecoveryTokenRepository";
import { RecoveryToken } from "../../entities/RecoveryToken";

export class RecoveryTokenRepository implements IRecoveryTokenRepository {
  private repository: Repository<RecoveryToken>;

  constructor() {
    this.repository = AppDataSource.getRepository(RecoveryToken);
  }

  async findByToken(token: string): Promise<RecoveryToken | null> {
    return await this.repository.findOne({
      where: { token },
      relations: ["user"],
    });
  }

  async findById(id: string): Promise<RecoveryToken | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.repository
      .createQueryBuilder("recovery_tokens")
      .update(RecoveryToken)
      .set({ deletedAt: new Date() })
      .where("recovery_tokens.user_id = :userId", { userId })
      .execute();
  }

  async create(data: RecoveryToken): Promise<void> {
    await this.repository.save(data);
  }
}
