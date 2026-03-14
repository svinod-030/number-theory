const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const appJsonPath = path.join(__dirname, '..', 'app.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

if (appJson.expo.version !== packageJson.version) {
  console.log(`Syncing app.json version: ${appJson.expo.version} -> ${packageJson.version}`);
  appJson.expo.version = packageJson.version;
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
} else {
  console.log('Versions are already in sync.');
}
