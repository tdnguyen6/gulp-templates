import { x } from "@/utils";
import { echo } from "shelljs";

export async function hello() {
  await echo("echo Hello World");
}

export * from "@/config-gen";
