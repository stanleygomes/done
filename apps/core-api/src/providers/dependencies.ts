import { EmailService, JwtService } from "@paul/node-utils";
import type { SignOptions } from "jsonwebtoken";
import { config } from "../config/environment.js";
import { AuthController } from "../controllers/auth/auth.controller.js";
import { UserController } from "../controllers/user/user.controller.js";
import { PromptController } from "../controllers/prompt/prompt.controller.js";
import { ApiClientRepository } from "../repositories/api-client.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";
import { ClientCredentialsService } from "../services/client-credentials.service.js";
import { CreateApiClientService } from "../services/create-api-client.service.js";
import { GetProfileService } from "../services/get-profile.service.js";
import { LoginPasswordService } from "../services/login-password.service.js";
import { RefreshTokenService } from "../services/refresh-token.service.js";
import { ResetPasswordService } from "../services/reset-password.service.js";
import { SendEmailCodeService } from "../services/send-email-code.service.js";
import { UpdateProfileService } from "../services/update-profile.service.js";
import { VerifyEmailCodeService } from "../services/verify-email-code.service.js";
import { CheckUserExistenceService } from "../services/check-user-existence.service.js";
import { RegisterService } from "../services/register.service.js";
import { PromptLogRepository } from "../repositories/prompt-log.repository.js";
import { GoogleAiStudioService } from "../services/google-ai-studio.service.js";
import { PromptExecutionService } from "../services/prompt-execution.service.js";
import { ProjectRepository } from "../repositories/project.repository.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { PlanningRepository } from "../repositories/planning.repository.js";
import { AiService } from "../services/ai.service.js";
import { ProjectSyncService } from "../services/project-sync.service.js";
import { TaskSyncService } from "../services/task-sync.service.js";
import { SyncService } from "../services/sync.service.js";
import { TaskService } from "../services/task.service.js";
import { ProjectService } from "../services/project.service.js";
import { PlanningConversationService } from "../services/planning-conversation.service.js";
import { PlanningMessageService } from "../services/planning-message.service.js";
import { ProjectController } from "../controllers/project/project.controller.js";
import { TaskController } from "../controllers/task/task.controller.js";
import { SyncController } from "../controllers/sync/sync.controller.js";
import { PlanningConversationController } from "../controllers/planning-conversation/planning-conversation.controller.js";
import { PlanningMessageController } from "../controllers/planning-message/planning-message.controller.js";

// Repositories
const promptLogRepository = new PromptLogRepository();
const userRepository = new UserRepository();
const verificationCodeRepository = new VerificationCodeRepository();
const apiClientRepository = new ApiClientRepository();
const projectRepository = new ProjectRepository();
const taskRepository = new TaskRepository();
const planningRepository = new PlanningRepository();

// Services
const emailService = new EmailService(
  config.services.resend.apiKey,
  config.services.resend.fromEmail,
);

const jwtService = new JwtService(
  config.auth.jwtPrivateKey,
  config.auth.jwtPublicKey,
  config.auth.accessTokenExpiresIn as SignOptions["expiresIn"],
  config.auth.refreshTokenExpiresIn as SignOptions["expiresIn"],
);

const sendEmailCodeService = new SendEmailCodeService(
  verificationCodeRepository,
  userRepository,
  emailService,
);

const verifyEmailCodeService = new VerifyEmailCodeService(
  verificationCodeRepository,
  userRepository,
  jwtService,
);

const refreshTokenService = new RefreshTokenService(jwtService);
const clientCredentialsService = new ClientCredentialsService(
  apiClientRepository,
  jwtService,
);
const createApiClientService = new CreateApiClientService(apiClientRepository);
const getProfileService = new GetProfileService(userRepository);
const updateProfileService = new UpdateProfileService(userRepository);
const loginPasswordService = new LoginPasswordService(
  userRepository,
  jwtService,
);
const checkUserExistenceService = new CheckUserExistenceService(userRepository);
const resetPasswordService = new ResetPasswordService(
  verificationCodeRepository,
  userRepository,
);
const registerService = new RegisterService(userRepository, jwtService);

const googleAiStudioService = new GoogleAiStudioService();

const promptExecutionService = new PromptExecutionService(
  googleAiStudioService,
  promptLogRepository,
);

const aiService = new AiService();

const taskSyncService = new TaskSyncService(taskRepository);
const projectSyncService = new ProjectSyncService(projectRepository);

const syncService = new SyncService(taskSyncService, projectSyncService);
const taskService = new TaskService(taskRepository);
const projectService = new ProjectService(projectRepository);
const planningConversationService = new PlanningConversationService(
  planningRepository,
);
const planningMessageService = new PlanningMessageService(
  planningRepository,
  aiService,
);

// Controllers
export const promptController = new PromptController(promptExecutionService);
export const authController = new AuthController(
  sendEmailCodeService,
  verifyEmailCodeService,
  refreshTokenService,
  clientCredentialsService,
  createApiClientService,
  loginPasswordService,
  resetPasswordService,
  registerService,
  checkUserExistenceService,
);

export const userController = new UserController(
  getProfileService,
  updateProfileService,
);

export const projectController = new ProjectController(projectService);
export const taskController = new TaskController(taskService);
export const syncController = new SyncController(syncService);
export const planningConversationController =
  new PlanningConversationController(planningConversationService);
export const planningMessageController = new PlanningMessageController(
  planningMessageService,
);
