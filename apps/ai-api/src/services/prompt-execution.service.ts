import { ConcurrencyError } from "../errors/ConcurrencyError.js";
import { PromptLogRepository } from "../repositories/prompt-log.repository.js";
import { GoogleAiStudioService } from "./google-ai-studio.service.js";
import type { UserAuth } from "../types/user-auth.js";

export class PromptExecutionService {
  private isRunning = false;

  constructor(
    private readonly googleAiStudioService: GoogleAiStudioService,
    private readonly promptLogRepository: PromptLogRepository,
  ) {}

  async execute(
    contents: Array<{ role: string; parts: Array<{ text: string }> }>,
    user: UserAuth,
  ) {
    if (this.isRunning) {
      throw new ConcurrencyError("A prompt is already running");
    }

    this.isRunning = true;

    try {
      const response = await this.googleAiStudioService.executePrompt(contents);
      const createdAt = new Date();

      await this.promptLogRepository.save({
        userId: user.id,
        userEmail: user.email,
        prompt: JSON.stringify(contents),
        response,
        createdAt,
      });

      return {
        response,
        createdAt,
      };
    } finally {
      this.isRunning = false;
    }
  }
}
