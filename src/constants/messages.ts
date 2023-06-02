import { Colors, EmbedData } from "discord.js";

export const WELCOME_MESSAGE = {
  title: "Welcome",
  description: "Welcome to the server!",
  timestamp: new Date(),
  color: Colors.Aqua,
} as EmbedData;

export const ERROR_MESSAGE = {
  title: "Error",
  description: "An error occurred while processing your request.",
  timestamp: new Date(),
  color: Colors.Red,
} as EmbedData;
