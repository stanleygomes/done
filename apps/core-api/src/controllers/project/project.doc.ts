export const projectResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    color: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    is_deleted: { type: "boolean" },
    deleted_at: { type: "string", format: "date-time", nullable: true },
  },
};

export const listProjectsSchema = {
  description: "List all projects for the authenticated user",
  tags: ["Project"],
  response: {
    200: {
      type: "object",
      properties: {
        projects: {
          type: "array",
          items: projectResponseSchema,
        },
      },
    },
  },
};

export const createProjectSchemaDoc = {
  description: "Create a new project",
  tags: ["Project"],
  body: {
    type: "object",
    required: ["name", "color"],
    properties: {
      name: { type: "string" },
      color: { type: "string" },
    },
  },
  response: {
    201: projectResponseSchema,
  },
};

export const getProjectSchema = {
  description: "Get a project by ID",
  tags: ["Project"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: projectResponseSchema,
  },
};

export const updateProjectSchemaDoc = {
  description: "Update a project by ID",
  tags: ["Project"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      color: { type: "string" },
    },
  },
  response: {
    200: projectResponseSchema,
  },
};

export const deleteProjectSchema = {
  description: "Soft delete a project by ID",
  tags: ["Project"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: projectResponseSchema,
  },
};
