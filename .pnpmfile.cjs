module.exports = {
  hooks: {
    readPackage(pkg) {
      // @see https://github.com/pnpm/pnpm/discussions/4051
      if (pkg.name === "@nestjs/core" || pkg.name === "@nestjs/common") {
        delete pkg.peerDependencies;
        delete pkg.peerDependenciesMeta;
      }
      return pkg;
    },
  },
};
