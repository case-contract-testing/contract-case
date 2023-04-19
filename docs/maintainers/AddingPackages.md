# How to add a package

Packages need to be listed in a few locations. Here's a checklist if you are adding a new package:

- Add the package dir to `/packages`
- Update `release-please-config.json` with the location of the changelog and any other config
- Update `.release-please-manifest.json` with the initial version
- Update `.github/dependabot.yml`
- Confirm that `ci/*.sh` has the correct lifecycle scripts for your new package
