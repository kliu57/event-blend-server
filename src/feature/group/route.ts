import { Hono } from "hono";
import { Variables } from "../../types";
import { jwt } from "hono/jwt";
import { env } from "../../config/env";
import { ACCESS_TOKEN_COOKIE_NAME } from "../../config/constants";
import { isAuthenticated } from "../../middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { createGroupSchema } from "./schema";

const app = new Hono<{ Variables: Variables }>();

app.post(
  "/",
  zValidator("json", createGroupSchema),
  jwt({
    secret: env.JWT_ACEESS_TOKEN_SECRET,
    cookie: ACCESS_TOKEN_COOKIE_NAME,
  }),
  isAuthenticated,
  async (c) => {
    return c.json(
      {
        status: true,
        message: "Group created successfully",
      },
      201
    );
  }
);
export default app;