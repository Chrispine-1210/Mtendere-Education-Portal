export * from "../testimonials/testimonials.routes";
export * from "../testimonials/testimonials.controller";
export * from "../testimonials/testimonials.service";
export * from "../testimonials/testimonials.schema";
export * from "../testimonials/testimonials.model";
export * from "../testimonials/testimonials.analytics";
export * from "../testimonials/testimonials.broadcaster";

import { users, jobs, analytics } from "../modules/modules";

users.controller.createUser(...)
jobs.service.findJobs(...)
analytics.log("user_registered", { ... })

