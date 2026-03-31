CREATE TABLE `prompt_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`user_email` text NOT NULL,
	`prompt` text NOT NULL,
	`response` text NOT NULL,
	`created_at` integer NOT NULL
);
