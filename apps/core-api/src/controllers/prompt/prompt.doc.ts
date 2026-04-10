export const executePromptDoc = {
  body: {
    type: "object",
    required: ["contents"],
    properties: {
      contents: {
        type: "array",
        items: {
          type: "object",
          required: ["role", "parts"],
          properties: {
            role: { type: "string" },
            parts: {
              type: "array",
              items: {
                type: "object",
                required: ["text"],
                properties: {
                  text: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        response: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
      },
    },
    401: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    423: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};
