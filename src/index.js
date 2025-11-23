const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

/**
 * Send notification to Zapier webhook
 */
async function sendToZapier(webhookUrl, payload) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Zapier webhook error: ${response.status} ${response.statusText}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    core.error(`Failed to send to Zapier: ${error.message}`);
    throw error;
  }
}

/**
 * Get GitHub Actions log from captured file
 */
function getJobLog(logFilePath) {
  try {
    if (logFilePath && fs.existsSync(logFilePath)) {
      const content = fs.readFileSync(logFilePath, 'utf8');
      if (content && content.trim().length > 0) {
        return content;
      }
    }

    // Fallback: try to read from GITHUB_STEP_SUMMARY
    const stepSummary = process.env.GITHUB_STEP_SUMMARY || '';
    if (stepSummary && fs.existsSync(stepSummary)) {
      const content = fs.readFileSync(stepSummary, 'utf8');
      if (content && content.trim().length > 0) {
        return content;
      }
    }

    return null;
  } catch (error) {
    core.warning(`Failed to read log file: ${error.message}`);
    return null;
  }
}

/**
 * Analyze log for errors (simple pattern matching)
 */
function analyzeLogForErrors(log) {
  if (!log || log.trim().length === 0) {
    return {
      hasError: false,
      status: 'unknown',
      summary: 'No log content available'
    };
  }

  const logLower = log.toLowerCase();

  // Check for error patterns
  const errorPatterns = [
    'error:', 'failed', 'failure', 'exception', 'fatal',
    'cannot', 'unable to', 'denied', 'not found', 'invalid'
  ];

  const hasError = errorPatterns.some(pattern => logLower.includes(pattern));

  // Extract error lines
  const lines = log.split('\n');
  const errorLines = lines.filter(line => {
    const lineLower = line.toLowerCase();
    return errorPatterns.some(pattern => lineLower.includes(pattern));
  });

  if (hasError) {
    return {
      hasError: true,
      status: 'failed',
      summary: errorLines.slice(0, 5).join('\n') || 'Errors detected in logs'
    };
  } else {
    return {
      hasError: false,
      status: 'success',
      summary: 'Workflow completed successfully'
    };
  }
}

/**
 * Main function
 */
async function run() {
  try {
    // Get inputs - use default webhook if not provided
    const zapierWebhook = core.getInput('zapier_webhook') || 'https://hooks.zapier.com/hooks/catch/25470556/uzws3gf/';
    const logFile = core.getInput('log_file');

    core.info('🤖 Airin is analyzing workflow logs...');

    // Prepare message with context
    const context = github.context;
    const repoName = context.repo.owner + '/' + context.repo.repo;
    const runUrl = `https://github.com/${repoName}/actions/runs/${context.runId}`;
    const commitMsg = context.payload.head_commit?.message || 'No commit message';
    const commitAuthor = context.payload.head_commit?.author?.name || context.actor;
    const branch = context.ref.replace('refs/heads/', '');

    // Get log content
    const logContent = getJobLog(logFile);

    // Analyze log for errors
    const analysis = analyzeLogForErrors(logContent);

    core.info(`📊 Analysis result: ${analysis.status}`);

    // Prepare payload for Zapier
    const payload = {
      status: analysis.status,
      hasError: analysis.hasError,
      repository: repoName,
      workflow: context.workflow,
      branch: branch,
      actor: commitAuthor,
      commit: commitMsg.split('\n')[0],
      runUrl: runUrl,
      summary: analysis.summary,
      timestamp: new Date().toISOString(),
      emoji: analysis.hasError ? '🚨' : '✅',
      statusText: analysis.hasError ? 'FAILED' : 'SUCCESS'
    };

    // Send to Zapier
    core.info('📱 Sending notification to Zapier webhook...');
    await sendToZapier(zapierWebhook, payload);

    core.info('✅ Airin successfully sent notification to Zapier');

  } catch (error) {
    core.setFailed(`❌ Airin failed: ${error.message}`);
  }
}

run();
