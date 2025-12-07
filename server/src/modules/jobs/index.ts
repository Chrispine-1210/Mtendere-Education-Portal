export * from "../jobs/jobs.routes";
export * from "../jobs/jobs.controller";
export * from "../jobs/jobs.service";
export * from "../jobs/jobs.schema";
export * from "../jobs/jobs.model";
export * from "../jobs/jobs.analytics";
export * from "../jobs/jobs.broadcaster";

import { users, jobs, analytics } from "../modules/modules";

users.controller.createUser(...)
jobs.service.findJobs(...)
analytics.log("user_registered", { ... })

