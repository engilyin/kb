# CI/CD

## Rules

1. `main` branch HEAD must corespond to the latest release artifact

2. `develop` branch must contain ALL commits existed in the `main` plus new completed features 

3. All changes into `develop` branch should be done through the approved Pull Request. 
   Every new merge generates the new SNAPSHOT artifact which is automatically deployed onto the `DEV` environment
   
3. All changes into `main` except HOTFIXES are done through the PR merge from `develop` branch.
   Every new merge generates the new RELEASE artifact and increnent the build version. This release
   artifact automatically deployed onto the `QA` environment and sequentionaly one by one onto the higher environments.
   It could be stopped on every step in case of any issues (found bugs etc) on lower environment
 
4. Every developor is responsible to make sure before the merge `feature branch` to `develop` that:
   
   - the progect can be successfully built
   - all unit tests are passed
   - all integrations tests (if any) are passed
   - If required: Veracode scan is passed
   - new feature has enough unit and integration tests
   
5. All feature branches are created from HEAD of `develop` branch.  
   
6. In case of urgent changes request it could be done through the HOTFIX approach. 
   Unlike feature branches the `hotfix` branch is created from HEAD of `main`. 
   This is the only branch that should fork directly off of `main`. As soon as the fix is complete, 
   it MUST be merged into BOTH `main` and `develop` (or the current release branch), and `main`` should be 
   tagged with an updated version number.  
   This process should be done through the special Jenkins Job
   
   
## Basis


12factors

X. Dev/prod parity

The time gap: A developer may work on code that takes days, weeks, or even months to go into production.
Make the time gap small: a developer may write code and have it deployed hours or even just minutes later.

