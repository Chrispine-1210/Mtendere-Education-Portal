export * from "../users/users.routes";
export * from "../users/users.controller";
export * from "../users/users.service";
export * from "../users/users.schema";
export * from "../users/users.model";
export * from "../users/users.analytics";
export * from "../users/users.broadcaster";

import { users, jobs, analytics } from "../modules/modules";

users.controller.createUser(...)
jobs.service.findJobs(...)
analytics.log("user_registered", { ... })

