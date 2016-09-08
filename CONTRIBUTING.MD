
# Contributing to the Flash API

This guideline is designed to organize and make contribution changes run as smoothly and efficiently as possible.

#### Clone the Repository
`git clone https://github.com/STSILABS/flash-api.git`

#### Making Changes

All development done for this repository should follow the principles outlined in the [gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

![gitflow Diagram](https://www.atlassian.com/git/images/tutorials/collaborating/comparing-workflows/gitflow-workflow/01.svg)

* Create a feature branch off of the `develop` branch (typically, though not always). The name of the feature branch should be `feature/<NAME_OF_FEATURE>` (for example `feature/login-rework`).
  * `git checkout -b new-branch-name origin/develop`
  
* Make your changes and commit to local machine
  * `git add .` : More info on [git add](https://git-scm.com/docs/git-add)
  * `git commit -m "add some notes"` : More info on [git commit](https://git-scm.com/docs/git-commit)
  
  **NOTE:** Follow the guideline for [writing good commit](http://chris.beams.io/posts/git-commit/) message
  * Make sure your tests pass!
  
#### Pull in Develop Branch
  * `git pull origin develop`
  * If necessary, resolve [Merge Conflicts](https://help.github.com/articles/resolving-a-merge-conflict-from-the-command-line/)
  
#### Push Changes
  * Push your changes to the new-branch-name in the remote repository.
  * `git push -u origin new-branch-name`: More info on [git push](https://git-scm.com/docs/git-push)
  
#### Pull Request
  * Using Github.com UI, submit the new-branch-name pull request.
  * If the pull request closes a Github issue, please include "Closes #<ISSUE_NUM>" in the pull request message for automatic closing of the issue.  More information on [Closing Github issues automatically](https://help.github.com/articles/closing-issues-via-commit-messages/)
  * Wait for Peer review and Approval
  * More information on [Pull Request](https://help.github.com/articles/using-pull-requests/)
