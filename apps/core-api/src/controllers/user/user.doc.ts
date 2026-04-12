export const getProfileSchema = {
  description: "Get authenticated user profile",
  tags: ["Users"],
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string", format: "email" },
        name: { type: "string", nullable: true },
        created_at: { type: "string", format: "date-time", nullable: true },
        updated_at: { type: "string", format: "date-time", nullable: true },
      },
    },
  },
};

export const updateProfileSchema = {
  description: "Update authenticated user profile",
  tags: ["Users"],
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string", format: "email" },
        name: { type: "string", nullable: true },
        created_at: { type: "string", format: "date-time", nullable: true },
        updated_at: { type: "string", format: "date-time", nullable: true },
      },
    },
  },
};
