## Background

Healthcare Resource Groups ([HRGs](https://digital.nhs.uk/services/secondary-uses-service-sus/payment-by-results-guidance/sus-pbr-reference-manual/hrg-grouping#healthcare-resource-groups)) are the 'currency' of Payment by Results (PbR) for admitted patient care, outpatient procedures and A&E attendances.  _Complications & Comorbidities_ (CC) lists, maintained by NHS England's National Casemix Office, are an integral part HRG design.

SCATA was asked by the National Casemix Office to review the ICD-10 diagnosis codes for conditions which, where a patient was undergoing care requiring anaesthesia input, the patient would be expected to consume additional resources from an anaesthesia perspective.

Secondary diagnoses on the _Complications and Comorbidities_ lists have a score of either 1 or 2 depending on how significant an impact on resource usage, with 2 being more significant.

## Propose a change to a condition’s weight

Anyone with a free GitHub account can suggest a change in their browser. A pull request (PR) is a proposal that the project maintainers can discuss and review before it is added to the dataset.

{{< details "How to propose a weight change on GitHub" >}}
1. [Open the ICD-10 index](/icd10/) and search for the condition by name or ICD-10 code. Open the condition’s page and select **View this condition’s file on GitHub** below the weight.
2. Sign in to GitHub or [create a free account](https://github.com/signup). On the file page, click the pencil icon (**Edit this file**) above the file. If GitHub asks you to **Fork this repository**, click that button to make a copy under your account.
3. In the editor, find the `Weight:` line near the top and change the number. Use `0` for no additional anaesthesia resource use, `1` for additional resource use, or `2` for a more significant impact. Set `Matters:` to `No` for weight `0`, or `Yes` for weight `1` or `2`. Keep the rest of the file as it is.
4. Click **Commit changes…** and enter a short summary that includes the ICD-10 code and the proposed weight. If GitHub asks where to save the change, choose the option to create a new branch and start a pull request. Click **Propose changes**.
5. On the pull request page, describe the current and proposed weights, why the condition affects anaesthesia resource use, and any supporting evidence. Keep patient-identifiable information out of the public proposal. Check that the proposal targets the `main` branch of `scatauk/icd10`, then click **Create pull request**. You can follow the discussion on that page.

For the local Git workflow and site setup, see the [contribution guide](https://github.com/scatauk/icd10/blob/main/CONTRIBUTING.md).
{{< /details >}}
