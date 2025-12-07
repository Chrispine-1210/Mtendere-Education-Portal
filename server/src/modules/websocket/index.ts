//export * from "../websocket/ws.routes";
//export * from "../websocket/ws.controller";
//export * from "../websocket/ws.service";
//export * from "../websocket/ws.schema";
//export * from "../websocket/ws.model";
//xport * from "../websocket/ws.analytics";
//export * from "../websocket/ws.broadcaster";

export * from "../websocket/ws.gateway";
export * from "../websocket/ws.types";
export * from "../websocket/ws.util";

import { users, jobs, analytics } from "../modules/modules";

users.controller.createUser(...)
jobs.service.findJobs(...)
analytics.log("user_registered", { ... })

