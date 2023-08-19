module.exports = async ({ github, context, core, fetch }) => {
  const { readFileSync } = require("node:fs");
  const { resolve } = require("node:path");
  const { minimatch } = require("minimatch");

  const monoRepoConfig = JSON.parse(
    readFileSync(
      resolve(
        process.env.GITHUB_WORKSPACE,
        ".github/workflows/monorepo-scripts/configuration.json"
      ),
      "utf8"
    )
  );

  const globalFiles = monoRepoConfig.global.files;
  let changedPackages = monoRepoConfig.packages;

  let changedFiles = [];
  let currentBranch = "";
  let hasSuccessRun = true;
  let currentEnvironment = "";
  switch (context.eventName) {
    case "push":
      currentBranch = context.ref.replace("refs/heads/", "");
      currentEnvironment =
        currentBranch === "master" ? "production" : currentBranch;
      const { data: workflowRuns } = await github.rest.actions.listWorkflowRuns(
        {
          owner: context.repo.owner,
          repo: context.repo.repo,
          workflow_id: "ci-cd-complete.yaml",
          branch: context.ref.replace("refs/heads/", ""),
          status: "success",
          per_page: 1,
        }
      );
      hasSuccessRun = workflowRuns.total_count !== 0;
      if (hasSuccessRun) {
        changedFiles = (
          await github.rest.repos.compareCommits({
            owner: context.repo.owner,
            repo: context.repo.repo,
            base: workflowRuns.workflow_runs[0].head_sha,
            head: context.sha,
          })
        ).data.files;
      }
      break;
    case "pull_request":
      currentBranch = context.payload.pull_request.base.ref;
      currentEnvironment =
        currentBranch === "master" ? "staging" : currentBranch;
      changedFiles = (
        await github.rest.repos.compareCommits({
          owner: context.repo.owner,
          repo: context.repo.repo,
          base: context.payload.pull_request.base.sha,
          head: context.sha,
        })
      ).data.files;
    default:
      break;
  }
  changedPackages =
    Object.fromEntries(
      Object.entries(changedPackages).filter(
        ([key, { workspace, files }]) =>
          // 检测文件是否在工作区内或者匹配glob pattern或者extend pattern
          !hasSuccessRun ||
          changedFiles.some(
            ({ filename }) =>
              globalFiles.some((pattern) => minimatch(filename, pattern)) ||
              files.some((pattern) => minimatch(filename, pattern)) ||
              filename.startsWith(workspace)
          )
      )
    ) || {};

  const currentVersionContent = readFileSync(
    resolve(process.env.GITHUB_WORKSPACE, monoRepoConfig.version.file),
    "utf8"
  );
  let previousVersion = "";
  let currentVersion = new RegExp(monoRepoConfig.version.pattern, "g").exec(
    currentVersionContent
  )[1];
  if (currentEnvironment == "production") {
    const { data: tags } = await github.rest.repos.listTags({
      owner: context.repo.owner,
      repo: context.repo.repo,
    });
    previousVersion = tags[0]?.name.replace("v", "") || "";
  }

  const needRelease =
    currentEnvironment === "production" &&
    (!hasSuccessRun || currentVersion !== previousVersion);
  const needPublish =
    Object.keys(changedPackages).length !== 0 &&
    !(context.eventName === "pull_request" && currentBranch === "develop");
  const needDeploy = needPublish || needRelease;
  const publishVersion = needRelease ? currentVersion : currentEnvironment;

  const detectResults = {
    "changed-packages": changedPackages,
    "current-environment": currentEnvironment,
    "has-changed-packages": Object.keys(changedPackages).length !== 0,
    "need-publish": needPublish,
    "need-release": needRelease,
    "need-deploy": needDeploy,
    "previous-version": previousVersion,
    "current-version": currentVersion,
    "publish-version": publishVersion,
  };

  core.setOutput("changed-packages", changedPackages);
  core.setOutput("detect-results", JSON.stringify(detectResults, null, 2));

  return detectResults;
};
