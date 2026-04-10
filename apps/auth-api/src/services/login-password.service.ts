import { JwtService, JwtPayload, HashUtils } from "@paul/node-utils";
import { AuthError } from "../errors/AuthError.js";
import { UserRepository } from "../repositories/user.repository.js";
import { config } from "../config/environment.js";

export class LoginPasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.password_hash) {
      throw new AuthError("Invalid email or password");
    }

    const { pepper } = config.auth;
    const isPasswordValid = await HashUtils.verify(
      password,
      user.password_hash,
      pepper,
    );

    if (!isPasswordValid) {
      throw new AuthError("Invalid email or password");
    }

    const payload: JwtPayload = { id: user.id, email: user.email };
    const token = this.jwtService.signAccessToken(payload);
    const refreshToken = this.jwtService.signRefreshToken(payload);

    return { token, refreshToken };
  }
}
