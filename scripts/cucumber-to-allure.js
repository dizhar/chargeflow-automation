import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cucumberJsonPath = path.join(__dirname, '../reports/cucumber-report.json');
const allureResultsDir = path.join(__dirname, '../allure-results');

// Create allure-results directory if it doesn't exist
if (!fs.existsSync(allureResultsDir)) {
  fs.mkdirSync(allureResultsDir, { recursive: true });
}

// Read Cucumber JSON report
const cucumberReport = JSON.parse(fs.readFileSync(cucumberJsonPath, 'utf8'));

// Convert each feature to Allure format
cucumberReport.forEach((feature) => {
  feature.elements.forEach((scenario) => {
    const uuid = crypto.randomUUID();
    const attachments = [];

    // Process embeddings (screenshots) from failed steps
    scenario.steps.forEach((step) => {
      if (step.embeddings && step.embeddings.length > 0) {
        step.embeddings.forEach((embedding) => {
          const attachmentUuid = crypto.randomUUID();
          const extension = embedding.mime_type === 'image/png' ? 'png' : 'txt';
          const attachmentFileName = `${attachmentUuid}-attachment.${extension}`;

          // Save attachment file
          const attachmentData = Buffer.from(embedding.data, 'base64');
          fs.writeFileSync(
            path.join(allureResultsDir, attachmentFileName),
            attachmentData
          );

          attachments.push({
            name: 'Screenshot',
            source: attachmentFileName,
            type: embedding.mime_type
          });
        });
      }
    });

    const allureResult = {
      uuid,
      historyId: scenario.id,
      fullName: `${feature.name}: ${scenario.name}`,
      labels: [
        { name: 'feature', value: feature.name },
        { name: 'suite', value: feature.name },
        ...scenario.tags.map(tag => ({ name: 'tag', value: tag.name.replace('@', '') }))
      ],
      links: [],
      name: scenario.name,
      status: scenario.steps.every(s => s.result.status === 'passed') ? 'passed' : 'failed',
      stage: 'finished',
      steps: scenario.steps.map((step) => ({
        name: `${step.keyword}${step.name}`,
        status: step.result.status === 'passed' ? 'passed' : 'failed',
        stage: 'finished',
        start: step.result.duration ? Date.now() - step.result.duration / 1000000 : Date.now(),
        stop: Date.now(),
        attachments: []
      })),
      attachments: attachments,
      start: Date.now() - (scenario.steps.reduce((sum, s) => sum + (s.result.duration || 0), 0) / 1000000),
      stop: Date.now()
    };

    fs.writeFileSync(
      path.join(allureResultsDir, `${uuid}-result.json`),
      JSON.stringify(allureResult, null, 2)
    );
  });
});

console.log('✅ Successfully converted Cucumber JSON to Allure format');
