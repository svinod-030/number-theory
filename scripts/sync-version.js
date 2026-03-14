const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const appJsonPath = path.join(__dirname, '..', 'app.json');
const buildGradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');

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

console.log('Version synchronization complete.');
