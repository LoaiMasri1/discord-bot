import { ApplicationCommandOption } from "discord.js";

interface CommandData {
  name: string;
  description: string;
  type?: number;
  options?: ApplicationCommandOption[];
}

export interface Command {
  data: CommandData;
  permissions?: string[];
  run: (...args: any[]) => Promise<void>;
}
