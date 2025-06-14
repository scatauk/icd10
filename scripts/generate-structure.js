const fs = require('fs');

const DUMMY_RUN = false;

fs.readFile('blank.csv', (err, data) => {
  if (err) throw err;
  const items = data.toString().split('\r\n');
  const output = [];
  const folders = [];
  let curFolder = '';
  items.forEach((element, index) => {
    let comment = '';
    let weight = '';
    let desc = '';
    let icd10 = '';
    let matters = '';
    // first line is header
    if (index > 0) {
      console.log('Processing line: ' + index + ' - ' + element);
      // a[0] is the first part of the line unti the first comma
      const t = element.split(',');
      icd10 = t[0];
      const toProcess = element.substring(t[0].length + 1, element.length);
      let quotesOpened = false;
      let d = '';
      let foundDesc = false;
      let nextIndex = 0;
      // go through rest of line char by char, first description:
      for (let i = 0; i < toProcess.length; i++) {
        if (!foundDesc) {
          if (toProcess[i] === '"') {
            console.log('Quotes at index: ' + i);
            if (quotesOpened) {
              // if quotes are opened, we close them
              quotesOpened = false;
            } else {
              // if quotes are not opened, we open them
              quotesOpened = true;
            }
          }
          // have we reached a comma and are we not inside quotes?
          if (toProcess[i] === ',') {
            if (!quotesOpened) {
              // if we are not inside quotes, we have reached the end of the description
              // if so, we have reached the end of the description
              console.log('Description found: ' + d);
              desc = d;
              foundDesc = true;
              nextIndex = i + 1;
            } else {
              // if we are inside quotes, we do not break, we continue to add characters to description
              d += toProcess[i];
            }
          } else {
            if (toProcess[i] !== '"') {
              // if we are not at a comma and not at quotes, we add the character to description
              d += toProcess[i];
            }
          }
        }
      }
      
      // next the matters (Yes of No), if toProcess from nextIndex is Yes, then push 'Yes' to matters, else push 'No'
      let matter = '';
      if (toProcess[nextIndex] === 'Y') {
        matter = 'Yes';
      } else if (toProcess[nextIndex] === 'N') {
        matter = 'No';
      } else {
        matter = 'Unknown';
      }
      matters = matter;
      // now move nextIndex to the next comma - it will be 4 characters after the current nextIndex if we had Matter of Yes, 3 characters if we had Matter of No
      nextIndex += (matter === 'Yes') ? 4 : 3;
      // now we have the weight, which is the next character after the comma
      let w = '';
      if (toProcess[nextIndex] === ',') {
        w = '0';
      } else if (toProcess[nextIndex] === '1') {
        w = '1';
      } else if (toProcess[nextIndex] === '2') {
        w = '2';
      }
      weight = w;
      // anything else is a comment which we push to comments array
      comment = toProcess.substring(nextIndex + 2, toProcess.length);
      if (comment === ',') {
        comment = '';
      }

      output.push({icd10: icd10, desc: desc, matter: matter, weight: weight, comment: comment});
      if (icd10.substring(0,1) !== curFolder) {
        curFolder = icd10.substring(0,1);
        folders.push(curFolder);
      }
    }
  });

  // if not a dummy run, create folders and files
  if (DUMMY_RUN) {
    console.log('DUMMY RUN: No folders or files will be created.');
    return;
  } else {

  // in parent folder create folders
    folders.forEach((folder) => {
      fs.mkdir(`../www/content/icd10/${folder}`, (err) => {
        if (err) throw err;
        fs.writeFile(`../www/content/icd10/${folder}/_index.md`, "", (err) => {
          if (err) throw err;
        });
      });
    });
    // save each icd10 in corresponding folder
    output.forEach((element, index) => {
      fs.writeFile(`../www/content/icd10/${element['icd10'].substring(0,1)}/${element['icd10']}.md`, 
      "---\nICD10: " + element.icd10 + "\n"
          + "Description: \"" + element.desc + "\"\n"
          + "Matters:" + " " + element.matter + "\n"
          + "Weight: " + element.weight + "\n"
          + "---\n"
          ,
          (err) => {
        if (err) throw err;
      });

      });
    console.log('Folders and files created successfully.');
    }
  });
