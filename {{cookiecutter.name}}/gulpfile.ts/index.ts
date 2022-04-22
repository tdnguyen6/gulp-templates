import { xjs } from "@/utils";

export async function hello() {
  await xjs("echo Hello World");
}

export * from "@/config-gen";
