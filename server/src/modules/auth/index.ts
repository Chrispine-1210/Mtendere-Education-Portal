//export * from "../auth/auth.routes";
//export * from "../auth/auth.controller";
//export * from "../auth/auth.service";
//export * from "../auth/auth.schema";
//export * from "../auth/auth.model";

export * from "./auth.controller";
export * from "./auth.routes";
export * from "./auth.schema";
export * from "./auth.service";
export * from "./jwt";

import { users, jobs, analytics } from "";

users.controller.createUser(...)
jobs.service.findJobs(...)
analytics.log("user_registered", { ... })

