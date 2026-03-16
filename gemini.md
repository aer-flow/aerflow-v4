# Project Rules for AI Agents

- **Mandatory GitHub Push**: EVERY completed task or bug fix MUST end with a `git push origin main`. This should be the VERY LAST action before finishing a task. NEVER push multiple times during the same process or mid-task; keep all changes for a single final push.
- **Never Use the Browser**: Do not use the `browser_subagent` or any browser-related tools to verify changes or search for info. Use code analysis, terminal tools, and local verification methods instead.
- **Proactive Deployment**: When a task is completely finished, the very last tool call before `notify_user` should be the git push.
