export const taskResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    content: { type: "string" },
    done: { type: "boolean" },
    important: { type: "boolean" },
    due_date: { type: "string", nullable: true },
    due_time: { type: "string", nullable: true },
    project_id: { type: "string", nullable: true },
    notes: { type: "string", nullable: true },
    url: { type: "string", nullable: true },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    is_deleted: { type: "boolean" },
    deleted_at: { type: "string", format: "date-time", nullable: true },
  },
};

export const listTasksSchema = {
  description: "List all tasks for the authenticated user",
  tags: ["Task"],
  querystring: {
    type: "object",
    properties: {
      since: { type: "string", description: "Timestamp in milliseconds" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        tasks: {
          type: "array",
          items: taskResponseSchema,
        },
      },
    },
  },
};

export const createTaskSchemaDoc = {
  description: "Create a new task",
  tags: ["Task"],
  body: {
    type: "object",
    required: ["content"],
    properties: {
      content: { type: "string" },
      done: { type: "boolean" },
      important: { type: "boolean" },
      due_date: { type: "string", nullable: true },
      due_time: { type: "string", nullable: true },
      project_id: { type: "string", nullable: true },
      notes: { type: "string", nullable: true },
      url: { type: "string", nullable: true },
    },
  },
  response: {
    201: taskResponseSchema,
  },
};

export const getTaskSchema = {
  description: "Get a task by ID",
  tags: ["Task"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: taskResponseSchema,
  },
};

export const updateTaskSchemaDoc = {
  description: "Update a task by ID",
  tags: ["Task"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      content: { type: "string" },
      done: { type: "boolean" },
      important: { type: "boolean" },
      due_date: { type: "string", nullable: true },
      due_time: { type: "string", nullable: true },
      project_id: { type: "string", nullable: true },
      notes: { type: "string", nullable: true },
      url: { type: "string", nullable: true },
      is_deleted: { type: "boolean" },
    },
  },
  response: {
    200: taskResponseSchema,
  },
};

export const deleteTaskSchema = {
  description: "Soft delete a task by ID",
  tags: ["Task"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: taskResponseSchema,
  },
};

export const suggestSubtasksSchema = {
  description: "Suggest subtasks via AI for a given task",
  tags: ["Task"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        subtasks: {
          type: "array",
          items: { type: "string" },
        },
      },
    },
  },
};
