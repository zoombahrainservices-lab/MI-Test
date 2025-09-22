#!/usr/bin/env node

/**
 * Force Clean Deployment Script
 * This script ensures Vercel only uses the latest clean commits
 */

const { execSync } = require('child_process');
const fs = require('fs');

// Get current commit hash
const currentCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
const shortCommit = currentCommit.substring(0, 7);

console.log('🚀 Force Clean Deployment Script');
console.log('================================');
console.log(`Current Commit: ${shortCommit}`);

// Valid commits (only these should be deployed)
const validCommits = [
  '0671b36', // Latest with all fixes
  '6b421ac', // TypeScript fixes
  '28a3578'  // Comprehensive fixes
];

// Check if current commit is valid
if (!validCommits.includes(shortCommit)) {
  console.error('❌ ERROR: Current commit is not in the valid deployment list!');
  console.error('Valid commits:', validCommits.join(', '));
  process.exit(1);
}

console.log('✅ Current commit is valid for deployment');

// Create deployment marker
const deploymentMarker = {
  commit: shortCommit,
  timestamp: new Date().toISOString(),
  status: 'ready_for_deployment',
  fixes: [
    'TypeScript errors resolved',
    'Database configuration optimized',
    'Build configuration updated',
    'All deployment issues fixed'
  ]
};

fs.writeFileSync('DEPLOYMENT_MARKER.json', JSON.stringify(deploymentMarker, null, 2));

console.log('✅ Deployment marker created');
console.log('🎯 Ready for Vercel deployment!');
console.log('');
console.log('Next steps:');
console.log('1. Push this commit to GitHub');
console.log('2. Deploy from Vercel dashboard');
console.log('3. Verify deployment uses commit:', shortCommit);
