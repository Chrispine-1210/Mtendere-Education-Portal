export * from "../analytics/analytics.logger";
export * from "../analytics/anlytics.middleware";

import fr from "zod/v4/locales/fr.cjs";
import { users, jobs, analytics } from "../modules/modules";

users.controller.createUser(...)
jobs.service.findJobs(...)
analytics.log("user_registered", { ... })

