/*
 * Script to clone `en.json` i18n translation file
 * replacing all values by "QQQQQ" to easily spot missing translations
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, '../src/i18n/en.json');
const destinationFilePath = path.join(__dirname, '../src/i18n/qq.json');

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function replaceTranslations(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      replaceTranslations(obj[key]);
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map((item) => (typeof item === 'string' ? 'QQQQQ' : item));
    } else {
      obj[key] = 'QQQQQ';
    }
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function createDebugTranslationFile(sourceFilePath, destinationFilePath) {
  const jsonData = readJSON(sourceFilePath);
  replaceTranslations(jsonData);
  writeJSON(destinationFilePath, jsonData);
  console.info(`Debug translation file created at ${destinationFilePath}`);
}

createDebugTranslationFile(sourceFilePath, destinationFilePath);
