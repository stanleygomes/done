import { HashUtils } from "@paul/node-utils";
import { AuthError } from "../errors/AuthError.js";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { config } from "../config/environment.js";

export class ResetPasswordService {
  constructor(
    private readonly verificationCodeRepository: VerificationCodeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<void> {
    const verificationRecord = await this.verificationCodeRepository.findValid(
      email,
      code,
    );

    if (!verificationRecord) {
      throw new AuthError("Invalid or expired verification code");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AuthError("User not found");
    }

    const { pepper } = config.auth;
    const passwordHash = await HashUtils.generate(newPassword, { pepper });

    await this.userRepository.update(user.id, {
      password_hash: passwordHash,
    });

    await this.verificationCodeRepository.markUsed(verificationRecord.id);
  }
}
