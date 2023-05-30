import { RecoveryToken } from "../entities/RecoveryToken";

export abstract class IRecoveryTokenRepository {
  abstract findById(id: string): Promise<RecoveryToken | null>;
  abstract findByToken(token: string): Promise<RecoveryToken | null>;
  abstract create(data: RecoveryToken): Promise<void>;
  abstract deleteByUserId(userId: string): Promise<void>;
}
