const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const appJsonPath = path.join(__dirname, '..', 'app.json');
const buildGradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');
const appConstantsPath = path.join(__dirname, '..', 'src', 'constants', 'index.ts');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

let appJsonChanged = false;

// 1. Sync app.json version
if (appJson.expo.version !== packageJson.version) {
  console.log(`Syncing app.json version: ${appJson.expo.version} -> ${packageJson.version}`);
  appJson.expo.version = packageJson.version;
  appJsonChanged = true;
}

if (appJsonChanged) {
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
}

// 2. Sync build.gradle versionName
if (fs.existsSync(buildGradlePath)) {
  let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');
  
  const versionNameRegex = /(versionName\s+")[^"]+(")/;
  const currentVersionNameMatch = buildGradle.match(versionNameRegex);
  
  if (currentVersionNameMatch && currentVersionNameMatch[0] !== `versionName "${packageJson.version}"`) {
    console.log(`Syncing build.gradle versionName -> ${packageJson.version}`);
    buildGradle = buildGradle.replace(versionNameRegex, `$1${packageJson.version}$2`);
    fs.writeFileSync(buildGradlePath, buildGradle, 'utf8');
  }
}

// 3. Sync APP_VERSION in src/constants/index.ts
if (fs.existsSync(appConstantsPath)) {
  let constants = fs.readFileSync(appConstantsPath, 'utf8');
  const appVersionRegex = /(APP_VERSION:\s*')[^']+(')/;
  const currentMatch = constants.match(appVersionRegex);

  if (currentMatch && currentMatch[0] !== `APP_VERSION: '${packageJson.version}'`) {
    console.log(`Syncing APP_VERSION in constants/index.ts -> ${packageJson.version}`);
    constants = constants.replace(appVersionRegex, `$1${packageJson.version}$2`);
    fs.writeFileSync(appConstantsPath, constants, 'utf8');
  }
}

console.log('Version synchronization complete.');
