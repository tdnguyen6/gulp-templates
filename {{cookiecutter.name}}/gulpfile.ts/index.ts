import { x } from "@/utils";

export async function hello() {
  const { stdout, stderr } = await x("echo Hello World");
  console.log(stdout);
  console.log(stderr);
}
