import { HashUtils, JwtService, JwtPayload } from "@paul/node-utils";
import { v4 as uuidv4 } from "uuid";
import { AuthError } from "../errors/AuthError.js";
import { UserRepository } from "../repositories/user.repository.js";
import { config } from "../config/environment.js";

export class RegisterService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AuthError("User already exists");
    }

    const { pepper } = config.auth;
    const passwordHash = await HashUtils.generate(password, { pepper });

    const user = await this.userRepository.create({
      id: uuidv4(),
      name: null,
      email,
      password_hash: passwordHash,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const payload: JwtPayload = { id: user.id, email: user.email };
    const token = this.jwtService.signAccessToken(payload);
    const refreshToken = this.jwtService.signRefreshToken(payload);

    return { token, refreshToken };
  }
}
