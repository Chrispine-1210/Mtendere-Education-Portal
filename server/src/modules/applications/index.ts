export * from "../applications/applications.routes";
export * from "../applications/applications.controller";
export * from "../applications/applications.service";
export * from "../applications/applications.schema";
export * from "../applications/applications.model";
export * from "../applications/applications.analytics";
export * from "../applications/applications.broadcaster";

import { users, jobs, analytics } from "../modules/modules";

users.controller.createUser(...)
jobs.service.findJobs(...)
analytics.log("user_registered", { ... })

