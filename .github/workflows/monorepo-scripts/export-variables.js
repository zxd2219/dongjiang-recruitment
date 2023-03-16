function exportData(core, data) {
  const exportResults = {};
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value !== "object") {
      exportResults[key] = value;
      core.setOutput(key, value);
    }
  });
  return exportResults;
}

module.exports = async ({ core }) => {
  const detectResults = JSON.parse(process.env.DETECT_RESULTS || "{}");
  if (detectResults === {}) {
    core.warning("No detect results found");
  }
  const currentPackage =
    detectResults["changed-packages"]?.[process.env.CURRENT_PACKAGE] || {};
  if (!currentPackage) {
    core.warning(
      `No changes detected for package ${process.env.CURRENT_PACKAGE}`
    );
  }
  const currentScript =
    currentPackage.scripts?.[process.env.CURRENT_SCRIPT] || {};
  if (currentScript === {}) {
    core.warning(
      `No script ${process.env.CURRENT_SCRIPT} found for package ${process.env.CURRENT_PACKAGE}`
    );
  }
  return {
    ...exportData(core, detectResults),
    ...exportData(core, currentPackage),
    ...exportData(core, currentScript),
  };
};
