
### Instructions for Team Members to Collaborate on GitHub

1. **Clone the Repository**  
   - Open the terminal and run:
     ```bash
     git clone https://github.com/your-repo-url.git
     ```
   - This will create a local copy of the main branch on your machine.

2. **Create a New Branch for Your Work**  
   - Before starting any new work, create a new branch. It’s best to name the branch after the feature you’re working on (e.g., `feature-homepage` or `bugfix-footer`):
     ```bash
     git checkout -b branch-name
     ```

3. **Work on the Feature**  
   - Make your changes, add files, and commit them frequently:
     ```bash
     git add .
     git commit -m "Clear, descriptive message about the changes"
     ```

4. **Push the Branch to GitHub**  
   - After committing, push your branch to GitHub:
     ```bash
     git push origin branch-name
     ```

5. **Create a Pull Request (PR) on GitHub**  
   - Go to the GitHub repository.
   - You should see an option to create a Pull Request for the branch you just pushed. Click on it and write a description of your changes.
   - **Request Review**: Tag reviewers as instructed (e.g., tagging you or other team members if needed).

6. **Respond to Feedback**  
   - If there’s any feedback on your PR, make the necessary changes in the same branch.
   - Commit and push the changes:
     ```bash
     git add .
     git commit -m "Addressed feedback on feature"
     git push origin branch-name
     ```

7. **Once Approved, the PR Will Be Merged**  
   - The team lead or assigned reviewer will merge the PR into the `main` branch once it’s approved.
   
8. **Pull Latest Changes from Main Branch**  
   - After merging, switch back to the main branch and pull the latest changes to stay up-to-date:
     ```bash
     git checkout main
     git pull origin main
     ```

---

### Additional Notes:
- **Sync Regularly**: Regularly pull changes from `main` to your branch to keep it up-to-date with the latest changes.
- **Code Quality**: Use descriptive commit messages and keep changes relevant to your feature.
- **Avoid Direct Commits to Main**: Direct commits to the main branch are restricted to maintain project integrity.

This workflow will ensure everyone’s changes are organized and reviewed, keeping the project stable and collaborative.
