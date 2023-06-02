import CustomClient from "../models/custom-client";
import { Logger } from "../utils";
export default (client: CustomClient) => {
  Logger.log(`Logged in as ${client.user?.tag}`, "info");
  client.application?.commands.set(client.commands.map((c) => c.data));
};
