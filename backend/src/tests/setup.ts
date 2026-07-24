import { afterAll } from "@jest/globals";
import { BaseDatabase } from "../data/BaseDatabase";

afterAll(async () => {
  await BaseDatabase.destroyConnection();
});