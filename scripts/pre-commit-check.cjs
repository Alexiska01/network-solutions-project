#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

function getStagedFiles() {
  try {
    const out = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return out.split(/\r?\n/).filter(Boolean);
  } catch (err) {
    console.error('Cannot get staged files:', err.message);
    process.exit(1);
  }
}

const staged = getStagedFiles();
if (!staged.length) process.exit(0);

// Block staging .env and common secret patterns
const bannedPaths = ['.env'];
// files or directories to skip checking (allow hooks/scripts to be added)
const skipPatterns = [/^scripts\//i, /^\.githooks\//i, /^\.env.example$/i];
const bannedContentPatterns = [
  /TELEGRAM_BOT_TOKEN/i,
  /TELEGRAM_CHAT_ID/i,
  /EXPORT_TOKEN/i,
  /BEGIN RSA PRIVATE KEY/i,
  /PRIVATE_KEY/i,
  /AKIA[0-9A-Z]{16}/i // AWS access key pattern
];

let failed = false;
for (const file of staged) {
  if (skipPatterns.some(p => p.test(file))) continue;
  if (bannedPaths.includes(file)) {
    console.error('\n[pre-commit] Blocked: trying to commit .env file. Remove it from staging and keep secrets out of git.');
    failed = true;
  }
  // Only check files that still exist in the index
  try {
    const content = execSync(`git show :"${file}"`, { encoding: 'utf8' });
    for (const p of bannedContentPatterns) {
      if (p.test(content)) {
        console.error(`\n[pre-commit] Blocked: file ${file} contains a likely secret matching ${p}`);
        failed = true;
      }
    }
  } catch (err) {
    // ignore binary or removed files
  }
}

if (failed) {
  console.error('\nCommit aborted by pre-commit hook. Fix the issues and try again.');
  process.exit(1);
}

process.exit(0);
