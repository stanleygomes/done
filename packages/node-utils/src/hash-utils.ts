import argon2 from "argon2";

export interface HashOptions {
  pepper?: string;
  timeCost?: number;
  memoryCost?: number;
  parallelism?: number;
}

export class HashUtils {
  private static readonly DEFAULT_OPTIONS = {
    timeCost: 10, // High security, equivalent to bcrypt(12)
    memoryCost: 65536, // 64MB
    parallelism: 4,
  };

  /**
   * Generates a hash for a password using Argon2id.
   * If a pepper is provided, it is prepended to the password before hashing.
   */
  public static async generate(
    password: string,
    options: HashOptions = {},
  ): Promise<string> {
    const { pepper, ...argon2Options } = options;
    const finalPassword = pepper ? `${pepper}${password}` : password;

    return argon2.hash(finalPassword, {
      ...this.DEFAULT_OPTIONS,
      ...argon2Options,
      type: argon2.argon2id,
    });
  }

  /**
   * Verifies a password against a hash using Argon2id.
   * If a pepper is provided, it is prepended to the password before verification.
   */
  public static async verify(
    password: string,
    hash: string,
    pepper?: string,
  ): Promise<boolean> {
    const finalPassword = pepper ? `${pepper}${password}` : password;
    return argon2.verify(hash, finalPassword);
  }
}
