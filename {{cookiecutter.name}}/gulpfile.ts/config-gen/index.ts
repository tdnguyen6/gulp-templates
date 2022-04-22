import { runMod, x } from "@/utils";
import { parallel, series, watch } from "gulp";

export async function buildConfig() {
  runMod("@/config-gen/cdk8s");
}

export async function buildConfigDev() {
  watch(
    ["gulpfile.ts/config-gen/**/*.ts"],
    {
      ignored: [
        "gulpfile.ts/config-gen/**/cdk8s/imports",
        "gulpfile.ts/config-gen/**/cdk8s.yaml",
      ],
    },
    buildConfig
  );
}

export async function importConfig() {
  process.chdir("gulpfile.ts/config-gen/cdk8s");
  const { stdout, stderr } = await x("npx cdk8s import");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}

export async function importConfigDev() {
  watch(
    ["gulpfile.ts/config-gen/**/cdk8s.yaml"],
    { ignored: ["gulpfile.ts/config-gen/**/cdk8s/imports"] },
    importConfig
  );
}

export const configGen = series(importConfig, buildConfig);

export const configGenDev = parallel(importConfigDev, buildConfigDev);
