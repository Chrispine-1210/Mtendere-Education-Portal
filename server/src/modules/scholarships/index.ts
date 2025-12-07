export * from "../scholarships/scholarships.routes";
export * from "../scholarships/scholarshipsusers/users.controller";
export * from "../scholarships/scholarships.service";
export * from "../scholarships/scholarships.schema";
export * from "../scholarships/scholarships.model";
export * from "../scholarships/scholarships.analytics";
export * from "../scholarships/scholarships.broadcaster";

import { users, jobs, analytics } from "../modules/modules";

users.controller.createUser(...)
jobs.service.findJobs(...)
analytics.log("user_registered", { ... })

