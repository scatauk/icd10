# Contributing to ICD-10 Anaesthesia

## Content contributions

For a single condition, use the [browser guide in the README](README.md#propose-a-change-to-a-conditions-weight).

Each condition has a Markdown file under `www/content/icd10/`, in the folder named for the first letter of its code. For example, code `A000` is in `www/content/icd10/A/A000.md`. The `Weight` and `Matters` fields are between the opening and closing `---` lines. Use `Weight: 0` with `Matters: No`, or `Weight: 1` or `Weight: 2` with `Matters: Yes`. Text below the closing `---` appears as comments on the condition page.

In the pull request description, include the affected codes, the current and proposed weights, the expected effect on anaesthesia resource use, and references where available. Keep patient-identifiable information out of the proposal.

## Technical contributions

The site uses Hugo and the dataset export script uses Node.js and npm. Use the Hugo version specified in [netlify.toml](netlify.toml) to match the deployed build.

1. Fork [scatauk/icd10 on GitHub](https://github.com/scatauk/icd10), then clone your fork and create a branch. Replace `YOUR-USERNAME` with your GitHub username.

   ```sh
   git clone https://github.com/YOUR-USERNAME/icd10.git
   cd icd10
   git switch -c propose-icd10-change
   ```

2. Edit the condition files or site source. Install the export dependencies, regenerate the downloads locally, and build the site from the repository root.

   ```sh
   npm ci
   node scripts/generate-icd10-csv.js
   hugo build --source www --gc --minify
   ```

   To preview the site, run `hugo server --source www` and open the address Hugo prints. For a weight change, check the condition page and the corresponding row in the generated downloads. The Netlify build regenerates the CSV and XLS from the condition files, so stage the source changes for your proposal.

3. Review `git diff`, stage the files you intend to submit, and commit and push your branch.

   ```sh
   git commit -m "Describe the proposed change"
   git push -u origin propose-icd10-change
   ```

4. On GitHub, click **Compare & pull request** and choose `scatauk/icd10` and `main` as the base repository and branch. Select your fork and branch as the source. Describe the changes and how you checked them, then click **Create pull request**. [GitHub’s guide to opening a pull request from a fork](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork).
