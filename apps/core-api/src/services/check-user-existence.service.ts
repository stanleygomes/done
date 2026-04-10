import { UserRepository } from "../repositories/user.repository.js";

export class CheckUserExistenceService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<{ isRegistered: boolean }> {
    const user = await this.userRepository.findByEmail(email);
    return { isRegistered: !!user };
  }
}
