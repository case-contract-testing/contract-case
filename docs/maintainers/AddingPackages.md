# How to add a package

Packages need to be listed in a few locations. Here's a checklist if you are adding a new package:

- Add the package dir to `/packages`
- Update `release-please-config.json` with the location of the changelog and any other config.
- Also, consider whether to add your package to the grouped releases in the same config file. If you do not, you must exclude it from the `"."` release, otherwise the version numbers will be incorrect.
- Update `.release-please-manifest.json` with the initial version
- Update `.github/dependabot.yml`
- Update `/docs/maintainers/PackageStructure.md`
- Confirm that `ci/*.sh` has the correct lifecycle scripts for your new package
