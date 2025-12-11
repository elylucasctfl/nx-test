// @ts-check

import { releaseVersion, releaseChangelog, releasePublish } from 'nx/release/index.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { readFileSync } from 'fs';

const argv = yargs(hideBin(process.argv));
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

(async () => {
  console.log(packageJson.releases);
  const options = await argv
    .version(false)
    .option('branch', {
      type: 'string',
      demandOption: true,
    })
    .option("version", {
      type: "string",
      choices: ["major", "minor", "patch"],
      default: undefined,
    })
    .option("preid", {
      type: "string",
    })
    .option("dryRun", {
      alias: "d",
      type: "boolean",
      default: true,
    })
    .option("verbose", {
      type: "boolean",
      default: false,
    })
    .parseAsync();
  

  console.log('options', options);
  
  const { workspaceVersion, projectsVersionData } = await releaseVersion({
    specifier: options.version,
    dryRun: options.dryRun,
    verbose: options.verbose, 
  });

  // await releaseChangelog({
  //   version: workspaceVersion,
  //   versionData: projectsVersionData,
  //   dryRun: options.dryRun,
  //   verbose: options.verbose,
  // });

  await releasePublish({
    dryRun: options.dryRun,
    verbose: options.verbose,
  });

  process.exit(0);
})();


