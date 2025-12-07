export * from "./partners.routes";
export * from "./partners.controller";
export * from "./partners.service";
export * from "./partners.schema";
export * from "./partners.model";
export * from "./partners.analytics";
export * from "./partners.broadcaster";

import { users, jobs, analytics } from "../modules/modules";

users.controller.createUser(...)
jobs.service.findJobs(...)
analytics.log("user_registered", { ... })

