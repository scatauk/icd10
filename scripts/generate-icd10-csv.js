// Node.js script to generate icd10-anesthesia.csv and .xls from markdown files
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const xlsx = require('xlsx');

const CONTENT_DIR = path.join(__dirname, '../www/content/icd10');
const DOWNLOAD_DIR = path.join(CONTENT_DIR, 'download');
const CSV_PATH = path.join(DOWNLOAD_DIR, 'icd10-anesthesia.csv');
const XLS_PATH = path.join(DOWNLOAD_DIR, 'icd10-anesthesia.xls');

const CSV_HEADERS = [
  {id: 'ICD10', title: 'ICD-10 Code'},
  {id: 'Description', title: 'Description'},
  {id: 'Matters', title: 'Matters from an Anaesthesia perspective'},
  {id: 'Suggested', title: 'Suggested value on "surgical" CC lists'},
  {id: 'Comment', title: 'Comment'}
];

function getAllMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath));
    } else if (
      file.endsWith('.md') &&
      file !== '_index.md'
    ) {
      results.push(filePath);
    }
  });
  return results;
}

function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);
  return {
    ICD10: data.ICD10 || path.basename(filePath, '.md'),
    Description: data.Description || '',
    Matters: data.Matters || '',
    Suggested: (typeof data.Weight !== 'undefined' && data.Weight !== 0) ? data.Weight : '',
    Comment: body.trim()
  };
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeCsv(records) {
  const csvWriter = createCsvWriter({
    path: CSV_PATH,
    header: CSV_HEADERS
  });
  return csvWriter.writeRecords(records);
}

function writeXls(records) {
  // Map records to use the same order and headers as CSV
  const data = records.map(r => [
    r.ICD10,
    r.Description,
    r.Matters,
    r.Suggested,
    r.Comment
  ]);
  const ws = xlsx.utils.aoa_to_sheet([
    CSV_HEADERS.map(h => h.title),
    ...data
  ]);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'ICD10');
  xlsx.writeFile(wb, XLS_PATH);
}

async function main() {
  ensureDir(DOWNLOAD_DIR);
  const files = getAllMarkdownFiles(CONTENT_DIR);
  const records = files.map(parseMarkdown);
  await writeCsv(records);
  writeXls(records);
  console.log(`Generated ${CSV_PATH} and ${XLS_PATH}`);
}

if (require.main === module) {
  main();
} 