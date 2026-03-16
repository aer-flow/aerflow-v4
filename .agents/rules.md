# Project Rules for AI Agents

- **Mandatory GitHub Push**: EVERY completed task or bug fix MUST end with a `git push origin main`. This is NOT optional. Do not wait for the user to ask.
- **Never Use the Browser**: Do not use the `browser_subagent` or any browser-related tools to verify changes or search for info. Use code analysis, terminal tools, and local verification methods instead.
- **Proactive Deployment**: If a task is finished, the very last tool call before `notify_user` should involve pushing the code if there are changes.
