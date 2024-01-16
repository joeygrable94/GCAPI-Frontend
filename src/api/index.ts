import { cache } from "@solidjs/router";
import { getUser as gU } from "./server";

export const getUser = cache(gU, "user");
