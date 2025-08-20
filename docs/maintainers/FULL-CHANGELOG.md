# Changelog

## [0.27.1](https://github.com/case-contract-testing/contract-case/compare/v0.27.0...v0.27.1) (2025-08-20)


### Features

* **core:** Control which contracts are written with contractsToWrite. Possible values are 'hash' and 'main', defaulting to both ([e7e18a3](https://github.com/case-contract-testing/contract-case/commit/e7e18a35b81b8150097706cc18c2c52512352ad6))


### Bug Fixes

* **core:** Fix an issue where type errors in interaction definitions would fail the test, but not prevent the contract from being written ([34b56ae](https://github.com/case-contract-testing/contract-case/commit/34b56ae11d090eca4a0842afdb12eb3d6f6d608e))
* Improve documentation for deprecated fields, and mark them as `forRemoval` ([7d6cbe1](https://github.com/case-contract-testing/contract-case/commit/7d6cbe1af7a1d50fa651056a24011cca9eebda6a))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.27.0 to 0.27.1

## [0.27.0](https://github.com/case-contract-testing/contract-case/compare/v0.26.1...v0.27.0) (2025-07-30)


### ⚠ BREAKING CHANGES

* **java-dsl:** Deprecate `RunTestCallback`. It is no longer used, instead use `prepareVerification` and `runPreparedTest`. This is a breaking change if you were relying on custom behaviour of RunTestCallback
* **jest-dsl:** Change `verifyContract` to use `prepareVerificationTests` and `runPreparedTest`. This changes the behaviour of the verification callback. You no longer need to call `runVerification` in this function

### Features

* **java-dsl:** Add `ContractCaseConnector.setNodeJsPath()` to allow specifying the path of the nodejs executable ([f228755](https://github.com/case-contract-testing/contract-case/commit/f228755a7cd10cd5a1d94842dbf75dd14ba68535))
* **java-dsl:** Allow overriding the crash advice with the `adviceOverride` `"CASE_CRASH_ADVICE"` ([60aceb3](https://github.com/case-contract-testing/contract-case/commit/60aceb36e7c7310c44eaa20e46c00d6bfb4f22d8))


### Bug Fixes

* Deprecate runVerification, as it is now replaced with getTests and runPreparedTest ([24cd85a](https://github.com/case-contract-testing/contract-case/commit/24cd85a1bae6e29cdfa315ae1e122a588d01fdd9))
* **java-dsl:** Substantially improve javadoc for adviceOverrides ([01125db](https://github.com/case-contract-testing/contract-case/commit/01125dbc5a31b11e88f79eaaaa1fa7ebb6da068d))


### Code Refactoring

* **java-dsl:** Deprecate `RunTestCallback`. It is no longer used, instead use `prepareVerification` and `runPreparedTest`. This is a breaking change if you were relying on custom behaviour of RunTestCallback ([c7e6cb9](https://github.com/case-contract-testing/contract-case/commit/c7e6cb98d8c98e7fe53557bad23ae03aecf3cffc))
* **jest-dsl:** Change `verifyContract` to use `prepareVerificationTests` and `runPreparedTest`. This changes the behaviour of the verification callback. You no longer need to call `runVerification` in this function ([2f68f87](https://github.com/case-contract-testing/contract-case/commit/2f68f879768afcf9362f4f968ad037f0ff42dd9b))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.26.1 to 0.27.0

## [0.26.1](https://github.com/case-contract-testing/contract-case/compare/v0.26.0...v0.26.1) (2025-07-13)


### Features

* **core:** Now will throw configuration exceptions if you try to write more to a written contract ([6bb2b03](https://github.com/case-contract-testing/contract-case/commit/6bb2b03be0464d42a64e99912bf7fc9be1e28a7d))


### Bug Fixes

* **function-plugin:** Correct regression where unexpected thrown exceptions from the code under test would be incorrectly reported as a crash ([65f194a](https://github.com/case-contract-testing/contract-case/commit/65f194a6538cf95584fc6a95a6df4e1fccbc15c9))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.26.0 to 0.26.1

## [0.26.0](https://github.com/case-contract-testing/contract-case/compare/v0.25.2...v0.26.0) (2025-07-11)


### ⚠ BREAKING CHANGES

* **core:** Removed the assumption that every interaction response can be described by "returns". This is a breaking change, because it needs contracts to be re-written, and http contracts with automatically named triggers will have to change triggers from \`"a (200) ..."\` to \`"returns a (200) ..."\`. If you need to stay compatible with contracts from before this version, you will need to provide both names in your trigger definitions

### Features

* Add Jest 30 as a possible peer dependency ([0f3cc98](https://github.com/case-contract-testing/contract-case/commit/0f3cc9819d3868a20f59bb28fd3dc11a5f42ca73))
* **core:** Now contract verification is guaranteed to run contracts in order, instead of interleaving interactions ([0648101](https://github.com/case-contract-testing/contract-case/commit/06481012140d935fc1134d5351f97be97bfe65e3))
* **core:** Removed the assumption that every interaction response can be described by "returns". This is a breaking change, because it needs contracts to be re-written, and http contracts with automatically named triggers will have to change triggers from \`"a (200) ..."\` to \`"returns a (200) ..."\`. If you need to stay compatible with contracts from before this version, you will need to provide both names in your trigger definitions ([7f06209](https://github.com/case-contract-testing/contract-case/commit/7f062096bdad81e5d763429682b99f481f9405ce))
* **java-dsl:** Now supports the prepareVerificationTests and runPreparedTest lifecycle for better integration with JUnit ([1408d46](https://github.com/case-contract-testing/contract-case/commit/1408d46a159978bec58bb4bb957b6979473534cb))
* Now `definer.endRecord()` returns a `ContractWriteSuccess` object, which contains details of the written contract(s) ([7299895](https://github.com/case-contract-testing/contract-case/commit/7299895f8ec7a9d8b3e351111045f5c7b75eb1e8))
* **plugin-base:** Added ability for matching errors to have context about what the data is, allowing more specific error messages ([150c0d6](https://github.com/case-contract-testing/contract-case/commit/150c0d6745afe0ba3b60819510fdc11346578c4d))


### Bug Fixes

* **connector:** Correct types read when moduleresolution is node ([ff29e62](https://github.com/case-contract-testing/contract-case/commit/ff29e62a8040c97eaa86ed2dcb09bed8cb940036))
* **core:** availableContractDescriptions now respects the configuration and only returns the filtered set of contracts. This was the intended (and documented) behaviour before. If you need to see the ignored contracts, they're visible in a call to this method with a logLevel of DEBUG or lower. ([9c4e5a8](https://github.com/case-contract-testing/contract-case/commit/9c4e5a8639572797bfda6b502c0e28dfc10a0b2f))
* **function-plugin:** Add debug logging of return value when caller is mocked ([cac45b5](https://github.com/case-contract-testing/contract-case/commit/cac45b5c95dcf6d875bf2c46c6dee4bc211e5c07))
* **function-plugin:** No longer repeats `returnValue` twice in error location messages ([4a5d4dd](https://github.com/case-contract-testing/contract-case/commit/4a5d4dd03c0cdb450ed4f430b580e100cd008a44))
* **function-plugin:** Substantially improved error messages when functions throw instead of returning, or receive the wrong number of arguments ([d25d819](https://github.com/case-contract-testing/contract-case/commit/d25d819a8478b887e7fc1bb4a747d0c0bd4428dc))
* **java-dsl:** Ensure that user-facing stack traces include the cause if they are chained exceptions ([6ba5326](https://github.com/case-contract-testing/contract-case/commit/6ba5326ffd5e5fc4694133cb636e5a8b79e4954e))
* **java-dsl:** Plugins were not passed to the core by the Verifier ([4791891](https://github.com/case-contract-testing/contract-case/commit/4791891d5201f8e6f2699deb5ca6c56731f35a14))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.2 to 0.26.0

## [0.25.2](https://github.com/case-contract-testing/contract-case/compare/v0.25.1...v0.25.2) (2025-06-22)


### Features

* **core:** Now exceptions thrown by the core have the same information as the failures it prints, substantially improving developer experience ([6319125](https://github.com/case-contract-testing/contract-case/commit/6319125fc69ded2f7534eaf39d00ef8405f1f4f0))
* **DSL:** Add WillReceiveFunctionCallAndThrow, for defining contracts of throwing functions at the implementer side of the contract ([4f01609](https://github.com/case-contract-testing/contract-case/commit/4f01609c5b4544cc50ef0312ed7e1fc657a74e40))


### Bug Fixes

* **function-plugin:** Correct error message when an exception is thrown ([afdd9b5](https://github.com/case-contract-testing/contract-case/commit/afdd9b517b7ee5daef8f82f26019579da468dc26))
* **function-plugin:** Improve description of thrown errors ([2cfb5e4](https://github.com/case-contract-testing/contract-case/commit/2cfb5e4da3a1c8f747915bf3b64f5363dc2b42fa))
* **java-dsl:** Add exceptions to the InvokeableFunction classes, allowing easier definition of contracts on methods that have checked exceptions ([f378b26](https://github.com/case-contract-testing/contract-case/commit/f378b263e4ea0cc568510b222849b61d9ab90eaf))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.1 to 0.25.2

## [0.25.1](https://github.com/case-contract-testing/contract-case/compare/v0.25.0...v0.25.1) (2025-06-18)


### Features

* **core:** Add ability to match throwing functions ([88f8978](https://github.com/case-contract-testing/contract-case/commit/88f8978e653a5a725cc58732d27348f2880fd484))


### Bug Fixes

* **core:** Fix crash in core when rendering certain failure kinds ([bcbed47](https://github.com/case-contract-testing/contract-case/commit/bcbed478439af142b18476ce9178530634661ccb))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.25.0 to 0.25.1

## [0.25.0](https://github.com/case-contract-testing/contract-case/compare/v0.24.2...v0.25.0) (2025-06-18)


### ⚠ BREAKING CHANGES

* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten.

### Bug Fixes

* **connector:** fix issue where logLevel: none couldn't be set from languages using the gRPC connector ([8beefd6](https://github.com/case-contract-testing/contract-case/commit/8beefd6d556c9f974f71b77bc49b98650bc258e8))
* **core:** Improve clarity of verification failed message ([fcf8deb](https://github.com/case-contract-testing/contract-case/commit/fcf8deb11acf53a359540edbb83fbbb8eaa146f4))
* **core:** Include user facing stack traces in most errors, substantially improving debugging experience ([ba5c06e](https://github.com/case-contract-testing/contract-case/commit/ba5c06eb46fded0138837cbe26d5227bc672a245))
* **function-plugin:** Fix an issue where serialisation in the function plugin would fail in some circumstances. This is a breaking change for users of function plugins - the contracts will need to be rewritten. ([6fd0ce2](https://github.com/case-contract-testing/contract-case/commit/6fd0ce2543fa682b870a00e812ccbb70bb3b5d2f))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.2 to 0.25.0

## [0.24.2](https://github.com/case-contract-testing/contract-case/compare/v0.24.1...v0.24.2) (2025-06-11)


### Features

* Add ability to override some configuration advice via adviceOverrides ([ef171e2](https://github.com/case-contract-testing/contract-case/commit/ef171e27225a6db1fd32e9c99c6d8b1ed3bd1a17))
* **plugin:** Added convenience method for determining whether contracts can't be published in the current setup ([3b0c516](https://github.com/case-contract-testing/contract-case/commit/3b0c5163dfb40a4adf029d476c8587ec0df54379))


### Bug Fixes

* **boundary:** Fix an issue where state handlers set in the verifier constructor wouldn't be respected ([e5c0528](https://github.com/case-contract-testing/contract-case/commit/e5c05281f52264e7a9e584978ac2e374e4c33306))
* **cli:** Downloaded contracts no longer write a main contract file, as we can't tell which one is main ([9631a77](https://github.com/case-contract-testing/contract-case/commit/9631a77ec58a2f35d7f0825c27822260cf1987bd))
* **core:** Ignore non-json files in the contract dir ([ae5f8a8](https://github.com/case-contract-testing/contract-case/commit/ae5f8a807323a38ff016f1dc68f96f50835a4a57))
* **core:** Improve debug logs when the required state handlers are missing ([a0d3292](https://github.com/case-contract-testing/contract-case/commit/a0d32928c269c51e05f4f7633537b22f5a5f7498))
* **core:** Now the verifier no longer says it's publishing results when it's only finalising the rverification ([e8b275f](https://github.com/case-contract-testing/contract-case/commit/e8b275f20ae80e702de08bf4ce4f0c061bb4a94b))
* **core:** The verifier no longer warns that it's not publishing contracts when you've explicitly told it not to ([673ebba](https://github.com/case-contract-testing/contract-case/commit/673ebba76237b70092c5f4646d552df3f13a37a8))
* **plugins:** Add explicit error code for missing state handler and document it ([4e18264](https://github.com/case-contract-testing/contract-case/commit/4e1826455b4cd9f3d6d883614e612aa8645731b7))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.1 to 0.24.2

## [0.24.1](https://github.com/case-contract-testing/contract-case/compare/v0.24.0...v0.24.1) (2025-06-09)


### Bug Fixes

* **java-dsl:** Add a no-argument version of runVerification(). This is a convenience function that implies no overridden configuration. ([8a68081](https://github.com/case-contract-testing/contract-case/commit/8a6808127050f0bdaed4cf292db7f16527a94e65))
* **java-dsl:** Expose RunTestCallback - it was supposed to be exposed before, but was missed. This allows easy customisation of individual verification results ([db82fc3](https://github.com/case-contract-testing/contract-case/commit/db82fc3144ed47875e812bf392e24b077ec56eb9))
* **java-dsl:** Now triggers can throw AssertionErrors if they wish to fail the test, regardless of whether an Exception is expected from the trigger or not ([36d4cfa](https://github.com/case-contract-testing/contract-case/commit/36d4cfa34e14b32f8272fd2ee3edfad5f26a5d97))
* **java-dsl:** Print warning if the verifier hasn't been closed at the time the shutdown hook for the core process is triggered ([00ebe83](https://github.com/case-contract-testing/contract-case/commit/00ebe830a6ed04b67d952158d436728bd62d06b8))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.24.0 to 0.24.1

## [0.24.0](https://github.com/case-contract-testing/contract-case/compare/v0.23.1...v0.24.0) (2025-05-26)


### ⚠ BREAKING CHANGES

* Drop support for node 18, as it is at end-of-life
* Drop support for node 18, as it is at end-of-life

### Features

* **core,java:** Add user-facing stack traces so that the source of errors is clear ([c8234ad](https://github.com/case-contract-testing/contract-case/commit/c8234adeebfa9bcf764009f5c4cc6c22562eebf6))


### Bug Fixes

* **java-dsl:** Add `throws Exception` to the signature of the response test methods, so you don't need to re-throw exceptions as `RuntimeException` ([4c49cce](https://github.com/case-contract-testing/contract-case/commit/4c49cce3c31b9943c58621b9c17b2324baeb73fa))
* **java-dsl:** Bump jsii version to get fix for aws/jsii[#4801](https://github.com/case-contract-testing/contract-case/issues/4801) - casuing console errors that weren't really errors ([a3924e7](https://github.com/case-contract-testing/contract-case/commit/a3924e7d6e426dc575e55f55c14626322a17ccd8))
* **java-dsl:** Correct the double-wrapping of exceptions, where a failure would be reported twice ([4b8999a](https://github.com/case-contract-testing/contract-case/commit/4b8999a1cb80bad5a6822d2b66d56ce824888556))
* **java-dsl:** Drop unnecessary proto compilation dependencies from the pacakge ([11a0f5e](https://github.com/case-contract-testing/contract-case/commit/11a0f5e980eb2f93df7f9ed4f824feb70bb8a466))
* **java-dsl:** Ensure that JUnit assertions are caught correctly ([27362a0](https://github.com/case-contract-testing/contract-case/commit/27362a0f6675622d7c85ad9147e466a345804a8c))
* **java-dsl:** If an interaction that is supposed to error instead returns successfully, now the object returned is toString()ed in the error message ([3dbc2fe](https://github.com/case-contract-testing/contract-case/commit/3dbc2feab3ea9ea83205f94582a0c0e606d8b7d5))


### Miscellaneous Chores

* Drop support for node 18, as it is at end-of-life ([8cb3160](https://github.com/case-contract-testing/contract-case/commit/8cb3160912b50539b5c76d9e2dbd963f4ce4ade0))
* Drop support for node 18, as it is at end-of-life ([fd91cd7](https://github.com/case-contract-testing/contract-case/commit/fd91cd7fd8e941ab386f19e971387dc4d22fd89c))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.23.1 to 0.24.0

## [0.23.1](https://github.com/case-contract-testing/contract-case/compare/v0.23.0...v0.23.1) (2025-05-04)


### Bug Fixes

* **java-dsl:** Fix problem where exceptions thrown in triggers would cause the test to hang ([0e6f686](https://github.com/case-contract-testing/contract-case/commit/0e6f68637445c6d7129bbda19ef40a823111e691))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.23.0 to 0.23.1

## [0.23.0](https://github.com/case-contract-testing/contract-case/compare/v0.22.0...v0.23.0) (2025-04-28)


### ⚠ BREAKING CHANGES

* **core:** Updated the behaviour of `contractFilename` to be controlled by `changedContracts`, to match `contractDir`. This is a breaking change, as previously it assumed that overwriting contracts was forbidden with an explicit filename
* **core:** Now writing a new contract for the first time requires changedContracts=OVERWRITE

### Features

* CaseConnectorErrors now come with an error code that can be used to programatically react to them. See the reference documentation for details. ([dee6d4d](https://github.com/case-contract-testing/contract-case/commit/dee6d4d36219edfad5dfa9f913b1f852666db289))
* **core:** Now writing a new contract for the first time requires changedContracts=OVERWRITE ([fee2b4f](https://github.com/case-contract-testing/contract-case/commit/fee2b4f568ba2f23997a9edea61c1090b733d129))


### Bug Fixes

* **core:** Improve the logging of location context ([500cbb7](https://github.com/case-contract-testing/contract-case/commit/500cbb7a1d3f14ee810bde2f3e3b2627acb29e96))
* **core:** Trying to define an empty contract now throws a CaseConfigurationError ([0f1d8a6](https://github.com/case-contract-testing/contract-case/commit/0f1d8a625cc8b4b452b58e9cfeda997ffb35c514))
* **core:** Updated the behaviour of `contractFilename` to be controlled by `changedContracts`, to match `contractDir`. This is a breaking change, as previously it assumed that overwriting contracts was forbidden with an explicit filename ([1e00836](https://github.com/case-contract-testing/contract-case/commit/1e00836398a0c52d1e41cde17da1c61cdde43db1))
* Improve logging of contract equality check ([1999430](https://github.com/case-contract-testing/contract-case/commit/19994302cc57bdd26094c5c6d4f53fa7e50b2edd))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.22.0 to 0.23.0

## [0.22.0](https://github.com/case-contract-testing/contract-case/compare/v0.21.0...v0.22.0) (2025-04-14)


### ⚠ BREAKING CHANGES

* **core:** New behaviour of using contacts like snapshots - the new setting changedContracts changes the behaviour when contracts are changed. Either 'FAIL' for fail when a contract is changed, or 'OVERWRITE' for overwriting when a contract is changed. Default is to FAIL, so this is a breaking change.

### Features

* **cli:** Add ability to invoke can-i-deploy from the CLI ([b2351ca](https://github.com/case-contract-testing/contract-case/commit/b2351cabd548d6b62b631fd45966cc2263325276))
* **cli:** Add option to specify the download directory ([dd95f1b](https://github.com/case-contract-testing/contract-case/commit/dd95f1bbe346d5339e7e155b75227371d68390d0))
* **connector:** Expose a CJS version as `@contract-case/case-connector/cjs` ([bbc490d](https://github.com/case-contract-testing/contract-case/commit/bbc490d0f92afb9a936be615e9663a8c27478cc7))
* **core:** Add ability to ask broker if it is safe to deploy ([17a3ec5](https://github.com/case-contract-testing/contract-case/commit/17a3ec5ecb7d5676137a4f7cd84dc4bb3e68d67b))
* **core:** New behaviour of using contacts like snapshots - the new setting changedContracts changes the behaviour when contracts are changed. Either 'FAIL' for fail when a contract is changed, or 'OVERWRITE' for overwriting when a contract is changed. Default is to FAIL, so this is a breaking change. ([b8dcd1f](https://github.com/case-contract-testing/contract-case/commit/b8dcd1f7ed16cfdeda22728da794a66e95f2870c))
* **core:** Write a main contract file alongside the hashed contract file when in contractDir mode. Useful for spotting changes to the main branch ([afb2e66](https://github.com/case-contract-testing/contract-case/commit/afb2e66ab415d2447ee983585c39e66d67d4e0eb))


### Bug Fixes

* **cli:** Fix issue where CLI wasn't executable on some systems ([cc67662](https://github.com/case-contract-testing/contract-case/commit/cc676620a807c8fe6ba93005df3302fe5a3d3094))
* **cli:** Fix issue where CLI wouldn't listen to some arguments ([8cf4062](https://github.com/case-contract-testing/contract-case/commit/8cf4062c16f1d7bffe3d5b51ec906a7d677db946))
* **core:** Contract hashes no longer include metadata or broker-provided fields. This means that broker downloaded contracts will match the uploaded hash ([60f4f5f](https://github.com/case-contract-testing/contract-case/commit/60f4f5f9c2fe3cfaecd3c90c4b5adb94f9dd3b65))
* **core:** Improve error message when non-brokered contract verification is published ([0cfbfa0](https://github.com/case-contract-testing/contract-case/commit/0cfbfa0471cd7ca0a9eec8b3abc28b3c4183527d))
* **core:** State-handler provided variables were accidentally included in the contract hash, now they aren't ([1f3045f](https://github.com/case-contract-testing/contract-case/commit/1f3045fb7b9bd6074fec6ec8aaefab9f7b638222))
* Improve reporting of stack traces when triggers fail ([deedb53](https://github.com/case-contract-testing/contract-case/commit/deedb532cbd8e62926cb58da3392ce41135a6dd5))
* **jest:** Expose package as CJS so that it plays better with jest ([34e8a3b](https://github.com/case-contract-testing/contract-case/commit/34e8a3b84b6b77a460dde5a76ae92a8e25acf504))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.21.0 to 0.22.0

## [0.21.0](https://github.com/case-contract-testing/contract-case/compare/v0.20.1...v0.21.0) (2025-03-25)


### ⚠ BREAKING CHANGES

* **dsl-java:** Move configuration and error classes out to their own packages; you will need to update your imports

### Features

* **dsl-java:** Allow custom log printers to be passed in ([69647d0](https://github.com/case-contract-testing/contract-case/commit/69647d090648a165b111a884424ff0a84c7e8a07))


### Bug Fixes

* **connector:** Start the connector on ipv6 ([#925](https://github.com/case-contract-testing/contract-case/issues/925)) ([e502231](https://github.com/case-contract-testing/contract-case/commit/e502231983f094d492dc141d4467f6dbb4d0315f))


### Code Refactoring

* **dsl-java:** Move configuration and error classes out to their own packages; you will need to update your imports ([0528878](https://github.com/case-contract-testing/contract-case/commit/0528878c6b611a9b1e6083a9ca5f2073e01f6203))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.20.1 to 0.21.0

## [0.20.1](https://github.com/case-contract-testing/contract-case/compare/v0.20.0...v0.20.1) (2025-03-22)


### Bug Fixes

* **case-connector:** Add the service to the server before starting, reducing chance of UNAVAILABLE errors ([39f3194](https://github.com/case-contract-testing/contract-case/commit/39f3194b86b1dd8632d29f3d9bc25d8a75655566))
* **dsl-java:** Always flush standard error when doing maintenance logs ([85dc3ed](https://github.com/case-contract-testing/contract-case/commit/85dc3eda230a904cf8f9c36493a82ebf24e40740))
* **dsl-java:** Fail fast rather than timing out if the core connection fails ([fcec040](https://github.com/case-contract-testing/contract-case/commit/fcec040699bae850894c530fa60e8e9bedfce1ea))
* **dsl-java:** Fix configuration that caused the retry introduced in the previous version not to be applied ([78ae904](https://github.com/case-contract-testing/contract-case/commit/78ae904ffcf7e5cd4707efd928bf99802ed41f65))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.20.0 to 0.20.1

## [0.20.0](https://github.com/case-contract-testing/contract-case/compare/v0.19.2...v0.20.0) (2025-03-20)


### ⚠ BREAKING CHANGES

* **core:** Contracts are now hashed to create the filename. This is a breaking change, because the default contractDir now stores contracts in subdirs (by provider name) and allows overwriting the contract file. This improves monorepo support. See the configuration documentation for details.

### Features

* **core:** Contracts are now hashed to create the filename. This is a breaking change, because the default contractDir now stores contracts in subdirs (by provider name) and allows overwriting the contract file. This improves monorepo support. See the configuration documentation for details. ([b2a078d](https://github.com/case-contract-testing/contract-case/commit/b2a078d18631c15caf27706a672c49d040a47790))
* **core:** Reading contracts from a directory is now recursive ([0bfd11f](https://github.com/case-contract-testing/contract-case/commit/0bfd11f91e3790dddf84a63fc9b9cdf05dd4882c))


### Bug Fixes

* **core:** Report full path of the written contract in the logs ([3f13e09](https://github.com/case-contract-testing/contract-case/commit/3f13e091f1ee3cebe161eff9740e00e5947b4bd3))
* **dsl-java:** Retry connection in the event of a failure ([6f4e027](https://github.com/case-contract-testing/contract-case/commit/6f4e0279d90f4aefac48016a4d41756c781db326))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.2 to 0.20.0

## [0.19.2](https://github.com/case-contract-testing/contract-case/compare/v0.19.1...v0.19.2) (2025-03-19)


### Bug Fixes

* **dsl-java:** Add pom to distributed jar, improving behaviour on some build systems ([934ddc9](https://github.com/case-contract-testing/contract-case/commit/934ddc9cb3ba9e7117f91babdf3c0ee115190628))
* **dsl-java:** Improve error messages when the core connection fails ([dec7792](https://github.com/case-contract-testing/contract-case/commit/dec7792e7028e43a7eb850e85033d6d7b9b486d7))
* **dsl-java:** Wait for the Core to be available before trying to call it; fixing flakiness on faster machines ([b388612](https://github.com/case-contract-testing/contract-case/commit/b3886123637d5267db019653bd3ee3f4004ba72e))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.1 to 0.19.2

## [0.19.1](https://github.com/case-contract-testing/contract-case/compare/v0.19.0...v0.19.1) (2025-03-18)


### Bug Fixes

* Downgrade protobuf version to avoid NoClassDefFoundError ([828ed4b](https://github.com/case-contract-testing/contract-case/commit/828ed4be99cc4081fa97c12243c9b730a5af4d5e))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.19.0 to 0.19.1

## [0.19.0](https://github.com/case-contract-testing/contract-case/compare/v0.18.0...v0.19.0) (2025-03-15)


### ⚠ BREAKING CHANGES

* The `mocks` module has been renamed `interactions`; and `AnyMockDescriptor` has been renamed `AnyInteractionDescriptor`. You may need to update your imports
* Replace runExample / runRejectingExample / runThrowingExample with runInteraction / runRejectingInteraction / runThrowingInteraction
* Allow different tests to have different values for the same default state variable. Contracts using state variables from the previous version will need to be regnerated
* Add ability for matchers to validate their own content. This is a breaking change for any plugin authors, as matcher Executor implementations now need to provide validation functions
* Move the matchers to packages grouped around related functionality - please update your imports following the matcher documentation

### Features

* Add ability for matchers to validate their own content. This is a breaking change for any plugin authors, as matcher Executor implementations now need to provide validation functions ([afaa8d7](https://github.com/case-contract-testing/contract-case/commit/afaa8d75d81e45ca7609f89b1e17819183bc59b2))
* Add ability for the current version to be generated from the git sha ([dd70365](https://github.com/case-contract-testing/contract-case/commit/dd703650fd058d34f6d772011b74faec10b93074))
* Expose docs-json for auto-documentation purposes ([2ff4e97](https://github.com/case-contract-testing/contract-case/commit/2ff4e97501bc29af4af085d7a751b752bad8e82c))
* Run parameter validators ahead of the self-check, allowing early warning of configuration mistakes in example interactions ([186d2e5](https://github.com/case-contract-testing/contract-case/commit/186d2e58eff512d37e53425ac353b231d15250a8))


### Bug Fixes

* Add debugging information to the broker 403 error ([a8cbb70](https://github.com/case-contract-testing/contract-case/commit/a8cbb70703fb19ac0351c038edeb23545b980ec3))
* Allow different tests to have different values for the same default state variable. Contracts using state variables from the previous version will need to be regnerated ([2984d2b](https://github.com/case-contract-testing/contract-case/commit/2984d2baf29406fab884c5fffc790b6022621047))
* Change the "-&gt;" in interaction names to "returns" ([e1c3f29](https://github.com/case-contract-testing/contract-case/commit/e1c3f29bb6803dff59f615b75b055cc3c9d184b7))
* Fix an issue where if the verifier was called with multiple contracts, they would inappropriately run concurrently ([83a8edd](https://github.com/case-contract-testing/contract-case/commit/83a8eddaf9a87231506cc39fc3439325923dd4bc))
* Improve logging when multiple contracts are verified ([9f3f4a2](https://github.com/case-contract-testing/contract-case/commit/9f3f4a249eeafdb4da57aef11807ff3e23f544d3))


### Code Refactoring

* Move the matchers to packages grouped around related functionality - please update your imports following the matcher documentation ([1edbda0](https://github.com/case-contract-testing/contract-case/commit/1edbda04c1fc6bcee19bfb13beb30980714bbfb6))
* Replace runExample / runRejectingExample / runThrowingExample with runInteraction / runRejectingInteraction / runThrowingInteraction ([a37e0e8](https://github.com/case-contract-testing/contract-case/commit/a37e0e8258672894e702aebdb5d9cddce90923b4))
* The `mocks` module has been renamed `interactions`; and `AnyMockDescriptor` has been renamed `AnyInteractionDescriptor`. You may need to update your imports ([f3f4b0d](https://github.com/case-contract-testing/contract-case/commit/f3f4b0dafb6f9be2a5055fe198dda03025b5682b))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.1.1 to 0.19.0

## [0.18.0](https://github.com/case-contract-testing/contract-case/compare/v0.17.1...v0.18.0) (2024-10-17)


### ⚠ BREAKING CHANGES

* Replace the config object in triggers with a clearer SetupInfo type, allowing cross-language function calls as mocks. Note that the function calls now always return json strings, user-facing DSLs will need to parse the strings

### Bug Fixes

* Improve broker logging and error reporting ([61fb28d](https://github.com/case-contract-testing/contract-case/commit/61fb28d362879fe68e70b2b15504da5c8b82ec5a))


### Code Refactoring

* Replace the config object in triggers with a clearer SetupInfo type, allowing cross-language function calls as mocks. Note that the function calls now always return json strings, user-facing DSLs will need to parse the strings ([c9ddd93](https://github.com/case-contract-testing/contract-case/commit/c9ddd93782b5e11cd5925ea76e089e0d779fdc11))

## [0.17.1](https://github.com/case-contract-testing/contract-case/compare/v0.17.0...v0.17.1) (2024-10-08)


### Bug Fixes

* Correct location of error messages when the string prefix / suffix don't resolve to strings ([ba3746e](https://github.com/case-contract-testing/contract-case/commit/ba3746e4ee5faab80051efe6aface1288f5a419b))
* Further improve logging of function invocation ([6641155](https://github.com/case-contract-testing/contract-case/commit/664115569ac7aac041ca05c6abe58cc585d9088c))
* Include all error messages in overall verification failed error ([889439f](https://github.com/case-contract-testing/contract-case/commit/889439faaacde40e54d988b93436bfa2d1a18253))
* Warn if the contract filename is too long ([fcc80d7](https://github.com/case-contract-testing/contract-case/commit/fcc80d7ed55a37bc85f95df3c460d8ad09d79e32))

## [0.17.0](https://github.com/case-contract-testing/contract-case/compare/v0.16.3...v0.17.0) (2024-10-02)


### ⚠ BREAKING CHANGES

* Separate case-plugin-base into case-plugin-base and case-plugin-dsl-types to make working with bundled dependencies easier. Some imports may need to be updated.

### Code Refactoring

* Separate case-plugin-base into case-plugin-base and case-plugin-dsl-types to make working with bundled dependencies easier. Some imports may need to be updated. ([6659218](https://github.com/case-contract-testing/contract-case/commit/6659218c053146c2c1171fa3c9621c6aa8399aac))

## [0.16.3](https://github.com/case-contract-testing/contract-case/compare/v0.16.2...v0.16.3) (2024-10-02)


### Bug Fixes

* Correct included jsii dependencies ([352f4b3](https://github.com/case-contract-testing/contract-case/commit/352f4b3753c16b83088fb6391aadddd4ef0628d3))

## [0.16.2](https://github.com/case-contract-testing/contract-case/compare/v0.16.1...v0.16.2) (2024-10-02)


### Bug Fixes

* Include pretty-format in package too ([c17b646](https://github.com/case-contract-testing/contract-case/commit/c17b646d0f52c24032df283c34cc517ff3cb6724))

## [0.16.1](https://github.com/case-contract-testing/contract-case/compare/v0.16.0...v0.16.1) (2024-10-01)


### Bug Fixes

* Correct broken JS includes ([a439292](https://github.com/case-contract-testing/contract-case/commit/a43929236dcf4130c4ec145bcacc95effacc6f15))

## [0.16.0](https://github.com/case-contract-testing/contract-case/compare/v0.15.8...v0.16.0) (2024-10-01)


### ⚠ BREAKING CHANGES

* Slightly improve the description of and matchers. This is a breaking change for anyone relying on the autogenerated example names.
* Replace test-equivalence-matchers and case-example-mock-types with one package named "case-definition-dsl"
* Export plugin as the default export instead of named
* Split HTTP mock and matchers to their own packages

### Features

* Add ability for plugins to specify their own configuration ([bf636c2](https://github.com/case-contract-testing/contract-case/commit/bf636c22a2564cfc2e4ebdac179835b32fa3a964))
* Add function caller mocks ([e05b370](https://github.com/case-contract-testing/contract-case/commit/e05b370380d67f1b0774631bbd83d5e0c83d6a59))
* Add function plugin for mocking function execution ([de74428](https://github.com/case-contract-testing/contract-case/commit/de74428f60945a754bf7da1fadc0f813bb5fa3f3))
* Add getPluginConfig convenience method for extracting the value of `mockConfig[pluginName]` ([50de742](https://github.com/case-contract-testing/contract-case/commit/50de74239f0a384043309986e7ce033f204d5865))
* Add loadPlugin message to both contract definition and verification grpc streams ([5845808](https://github.com/case-contract-testing/contract-case/commit/584580849cc48eaf990a2b559ab85f29f0b571b6))
* Add mockConfig configuration property ([f82a394](https://github.com/case-contract-testing/contract-case/commit/f82a394f4e048721f5399928a83f19ed044ac13c))
* Add MockFunctionCall to the definition dsl ([172fbe2](https://github.com/case-contract-testing/contract-case/commit/172fbe2b2c9a60942042e797e9ccf4e97bd39650))
* Add plugin loader methods to ContractDefiner and ContractVerifier ([1112f40](https://github.com/case-contract-testing/contract-case/commit/1112f40de01e53dd4dc5f60d9562a30a4fe090d4))
* Allow loading of plugins via PluginLoader class ([0968917](https://github.com/case-contract-testing/contract-case/commit/0968917a4fa3cca66e6d58b1fd2ac552e6b73a56))
* Allow specifying baseUrlUnderTest via mockConfig ([052ea3f](https://github.com/case-contract-testing/contract-case/commit/052ea3f6fadb95c7140c75024ac181b2fd8743ad))
* Extract proto to its own package ([6a64dbe](https://github.com/case-contract-testing/contract-case/commit/6a64dbe019d01b0477361cb9571b87dbcaddcb08))
* Include function plugin by default ([7c2a0f3](https://github.com/case-contract-testing/contract-case/commit/7c2a0f3efac06a0c088427fafc19b3abbf610382))
* Introduce mockConfig to configuration object ([225ab61](https://github.com/case-contract-testing/contract-case/commit/225ab614bacc41c1b7461bed678cb7e0cde0e8a6))
* Load matchers from plugin ([8bd1bf0](https://github.com/case-contract-testing/contract-case/commit/8bd1bf08bb08b552e92087e6ee75bf5205003a5b))


### Bug Fixes

* Avoid channel unavailable messages during normal shutdown ([0ccdbf7](https://github.com/case-contract-testing/contract-case/commit/0ccdbf7a5e2dfd10deb92a68b0b6a552ccef10d3))
* Correct documentation for And matcher ([70ed28d](https://github.com/case-contract-testing/contract-case/commit/70ed28d08ded1897acbf666dff863c42d3f89994))
* Correct issue where correctly configured http plugins said they weren't correctly configured ([df386cb](https://github.com/case-contract-testing/contract-case/commit/df386cb2e8ca41d6c1a06819dc84c611bb1b74ea))
* Extract sourcemap for better stack traces ([e465b96](https://github.com/case-contract-testing/contract-case/commit/e465b962296ae0c661c5c0a0dd7e230218e6aca7))
* Fix issue where tests could hang on node 18 ([e023711](https://github.com/case-contract-testing/contract-case/commit/e023711337a015eee3297fe42cc251c0ff49ef05))
* Hardcode error names so that they're robust to minification ([3106196](https://github.com/case-contract-testing/contract-case/commit/3106196f909ef703ecb15e0f076933a987e69fc3))
* Improve hasErrors function ([9b82033](https://github.com/case-contract-testing/contract-case/commit/9b8203359419ffc1be723e54228445df040be1d4))
* Improve location reporting when function return types don't match ([1f32560](https://github.com/case-contract-testing/contract-case/commit/1f325600c7690c8124750fa9e1e3bc4fffb05aca))
* Improve plugin configuration error messages ([11d44bb](https://github.com/case-contract-testing/contract-case/commit/11d44bb8e951df8197ce3a7abaf9ca1d3e2a817d))
* Improve plugin configuration errors and documentation ([30e5987](https://github.com/case-contract-testing/contract-case/commit/30e5987f52d0743b751c9ec57858e739260ac2fc))
* Remove unnecessary dependencies ([3bc3f37](https://github.com/case-contract-testing/contract-case/commit/3bc3f370aacf2a73eabb2984060c1c349c4ecfd1))
* Slightly improve the description of and matchers. This is a breaking change for anyone relying on the autogenerated example names. ([176eb01](https://github.com/case-contract-testing/contract-case/commit/176eb01cb3bef50a19e3b1b65dfbbe881b55d954))
* Support null responses, eg for void returns in functions ([1c2eeb1](https://github.com/case-contract-testing/contract-case/commit/1c2eeb1d72aabbaccbe67eec820e12463bdb84e0))


### Miscellaneous Chores

* Split HTTP mock and matchers to their own packages ([bfc2e4f](https://github.com/case-contract-testing/contract-case/commit/bfc2e4ff2d464899fd8ce63978048e9f1991ff80))


### Code Refactoring

* Export plugin as the default export instead of named ([78397d2](https://github.com/case-contract-testing/contract-case/commit/78397d2bea51b41f1c6b53bc70fdc741f5e7d084))
* Replace test-equivalence-matchers and case-example-mock-types with one package named "case-definition-dsl" ([031ce1e](https://github.com/case-contract-testing/contract-case/commit/031ce1e1eef309f37b17dfff6dc90a2317cac122))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @contract-case/eslint-config-case-maintainer bumped from 0.1.0 to 0.1.1

## [0.15.8](https://github.com/case-contract-testing/contract-case/compare/v0.15.7...v0.15.8) (2024-05-16)


### Features

* Add case-boundary into the connector package ([072222f](https://github.com/case-contract-testing/contract-case/commit/072222f4b4f1eeddef461b0007bc5f431217fb7b))
* Add internal config parameters to control whether verification is async or not ([6882739](https://github.com/case-contract-testing/contract-case/commit/68827393b0b766e753aeb77dcab123a2a01672fe))
* Implement and expose contract verifier ([ea460cd](https://github.com/case-contract-testing/contract-case/commit/ea460cd5a915975673b2f22d98e05fab3b2b1cba))


### Bug Fixes

* Prevent server waiting for keepalive timeout on http verification ([7cebbf0](https://github.com/case-contract-testing/contract-case/commit/7cebbf0ced18f7129ff31f01067938b2ed11390c))
* Remove current-git-branch, allowing webpack to roll up the package ([0078083](https://github.com/case-contract-testing/contract-case/commit/0078083936e7a51bb2df02dcc7c22541bd7d1b04))
* Significantly improve trigger configuration error messages ([c494726](https://github.com/case-contract-testing/contract-case/commit/c4947265d3a65e57c7ff051de93db2b500f843ec))
* Start the ContractCase server on a random port ([4c5d431](https://github.com/case-contract-testing/contract-case/commit/4c5d431848cb026701510cf7248f0c48ff5f8b75))
* Tidy up logging by demoting some noisy logs to deepMaintainerDebug from maintainerDebug ([b9c5548](https://github.com/case-contract-testing/contract-case/commit/b9c5548569bb3082e4d2ffa93be08323127b1932))
* Use case-connector instead of case-boundary ([ecc1c9a](https://github.com/case-contract-testing/contract-case/commit/ecc1c9a02f1afc7caadaf1844d9b49eb1843a014))

## [0.15.7](https://github.com/case-contract-testing/contract-case/compare/v0.15.6...v0.15.7) (2024-02-11)


### Bug Fixes

* Bump version of case-boundary to 0.10.4 ([a15aac9](https://github.com/case-contract-testing/contract-case/commit/a15aac9a1337b77831c9f0baf425b6e3f4e2fa17))

## [0.15.6](https://github.com/case-contract-testing/contract-case/compare/v0.15.5...v0.15.6) (2024-02-11)


### Bug Fixes

* Correct issue where type error might be thrown when a trigger function failed ([7889ef3](https://github.com/case-contract-testing/contract-case/commit/7889ef329f6e290221852752615c886d4d700158))
* Improve log output when matchers are double-specified ([62a4b09](https://github.com/case-contract-testing/contract-case/commit/62a4b09e53ab8b0b97af021388cbfbdc0f77b5ec))

## [0.15.5](https://github.com/case-contract-testing/contract-case/compare/v0.15.4...v0.15.5) (2024-01-30)


### Features

* Add a new AnyState supertype for the state variables ([854c312](https://github.com/case-contract-testing/contract-case/commit/854c312f1eac72e35c79d463936c089240c91fa6))


### Bug Fixes

* Correct an issue where nested lookup matchers would fail the test of whether or not they described the same thing ([bc2eac9](https://github.com/case-contract-testing/contract-case/commit/bc2eac9cb2ebb42044a957ed377501e5e3180c00))
* Improve logging of http responses ([4f8faef](https://github.com/case-contract-testing/contract-case/commit/4f8faeff9e5616e120ac60227b458ab643827d31))

## [0.15.4](https://github.com/case-contract-testing/contract-case/compare/v0.15.3...v0.15.4) (2024-01-23)


### Features

* Add InState and InStateWithVariables for describing states during example runs ([cb2d437](https://github.com/case-contract-testing/contract-case/commit/cb2d4372d405d7b25d2e27e67a0b9199366f8745))


### Bug Fixes

* **deps:** Bump version of case-boundary to 0.9.3 ([7a56f60](https://github.com/case-contract-testing/contract-case/commit/7a56f60888d077cda861e2c6cb52c82ff0b86a15))

## [0.15.3](https://github.com/case-contract-testing/contract-case/compare/v0.15.2...v0.15.3) (2024-01-18)


### Bug Fixes

* Correct issue where trigger functions that failed before calling the server would fail with the wrong reason ([1a8a375](https://github.com/case-contract-testing/contract-case/commit/1a8a3750421f0bad42c47a23b549c3790089fb6a))
* Improve debug logging around server startup and shutdown ([8509660](https://github.com/case-contract-testing/contract-case/commit/8509660d0e190b65677be7fcf5ca6e32a8cf2345))

## [0.15.2](https://github.com/case-contract-testing/contract-case/compare/v0.15.1...v0.15.2) (2024-01-06)


### Bug Fixes

* Correctly expose java types from jsii modules ([f40fc13](https://github.com/case-contract-testing/contract-case/commit/f40fc1371a3bc2565692e491125762b82b5e068b))
* Improve AnyMock documentation ([b518a6d](https://github.com/case-contract-testing/contract-case/commit/b518a6d4ef410506da4e1f3d5e9035878f596bc9))

## [0.15.1](https://github.com/case-contract-testing/contract-case/compare/v0.15.0...v0.15.1) (2024-01-06)


### Features

* Add a stringified convenience method to the mock descriptors ([a6fa77e](https://github.com/case-contract-testing/contract-case/commit/a6fa77e2c79073f183c603336f43503194f6d3b2))


### Bug Fixes

* Correct an issue where lookup matchers that had nulls were incorrectly seen as non-equal ([06ac4fa](https://github.com/case-contract-testing/contract-case/commit/06ac4fa0d7648dffd02dfbe083d0220e424358ca))
* Correct issue where trigger function errors weren't thrown in some cases ([6172c18](https://github.com/case-contract-testing/contract-case/commit/6172c1827c52b45cd98e2b992d3c31ad544585c9))
* Correct name in log string ([6dec88b](https://github.com/case-contract-testing/contract-case/commit/6dec88b0feaee94fb672078618053fe5129320c1))
* Improve maintainer logging when there are no errors thrown ([f5110c0](https://github.com/case-contract-testing/contract-case/commit/f5110c06b4ba6d280ff192e259154531918f9823))
* Improve trigger function error message ([1894fb5](https://github.com/case-contract-testing/contract-case/commit/1894fb53d0c8a31635880a4103a07464980f4e6f))

## [0.15.0](https://github.com/case-contract-testing/contract-case/compare/v0.14.0...v0.15.0) (2023-12-25)


### ⚠ BREAKING CHANGES

* Now all loggers and printers return promises, to better reflect that there is a boundary crossed

### Code Refactoring

* Now all loggers and printers return promises, to better reflect that there is a boundary crossed ([14a9365](https://github.com/case-contract-testing/contract-case/commit/14a9365d6f873c352dadff539b7d8b67946412d0))

## [0.14.0](https://github.com/case-contract-testing/contract-case/compare/v0.13.1...v0.14.0) (2023-10-11)


### ⚠ BREAKING CHANGES

* Only expose types in modules. Root imports will need to be updated to include the module name

### Features

* Add developer config package for api-extractor, prettier, eslint, tsconfig ([9588334](https://github.com/case-contract-testing/contract-case/commit/95883341698eb0f3f66812a1add0cb1ea85974ca))
* Add developer documentation ([6d2c52d](https://github.com/case-contract-testing/contract-case/commit/6d2c52d8134339aebeadfdd84e6bfe540afdca04))
* Add developer documentation ([8524363](https://github.com/case-contract-testing/contract-case/commit/85243632ef5f93c0d0fe639256ffdb5edbfb612c))
* Add developer documentation ([e855d61](https://github.com/case-contract-testing/contract-case/commit/e855d61f9615ca31f02762e780fe3dfa592b07e3))
* Add eslint config package ([f1659fa](https://github.com/case-contract-testing/contract-case/commit/f1659fa0035e69d64f7f7ecb49c977c377d3fceb))


### Bug Fixes

* Add link to documentation in warning message about zero-length arrays ([54dd26d](https://github.com/case-contract-testing/contract-case/commit/54dd26dd1d534b6c71f0c9a8655b4a264439b8e2))
* Correct issue where core code wasn't included in package ([7f70b3c](https://github.com/case-contract-testing/contract-case/commit/7f70b3c41cfab833dbeca56567bfda075275ac79))
* Improve intellisense documentation ([aebaac8](https://github.com/case-contract-testing/contract-case/commit/aebaac83c859a47e85ea2f2ceadbd5aaa70e416a))
* Make loglevel config option optional ([f6c18d9](https://github.com/case-contract-testing/contract-case/commit/f6c18d97434aebbff054c368b5929251935b41ea))
* No longer include coverage directories in package ([b5f42a0](https://github.com/case-contract-testing/contract-case/commit/b5f42a039b966c0fe908231adcc0154a1403846c))
* Remove unused dependencies ([7e51170](https://github.com/case-contract-testing/contract-case/commit/7e511705f71ecb4697375c13d394ba88701441f0))
* Update documentation for boundary classes ([bffd21b](https://github.com/case-contract-testing/contract-case/commit/bffd21b5dc338046a89e881d708ed4c5fa771aea))


### Code Refactoring

* Only expose types in modules. Root imports will need to be updated to include the module name ([015dc7a](https://github.com/case-contract-testing/contract-case/commit/015dc7a449805920a5c08cc54ca486ec8bcbc888))

## [0.13.1](https://github.com/case-contract-testing/contract-case/compare/v0.13.0...v0.13.1) (2023-10-11)


### Features

* Add developer config package for api-extractor, prettier, eslint, tsconfig ([9588334](https://github.com/case-contract-testing/contract-case/commit/95883341698eb0f3f66812a1add0cb1ea85974ca))
* Add developer documentation ([6d2c52d](https://github.com/case-contract-testing/contract-case/commit/6d2c52d8134339aebeadfdd84e6bfe540afdca04))
* Add developer documentation ([8524363](https://github.com/case-contract-testing/contract-case/commit/85243632ef5f93c0d0fe639256ffdb5edbfb612c))
* Add developer documentation ([e855d61](https://github.com/case-contract-testing/contract-case/commit/e855d61f9615ca31f02762e780fe3dfa592b07e3))
* Add eslint config package ([f1659fa](https://github.com/case-contract-testing/contract-case/commit/f1659fa0035e69d64f7f7ecb49c977c377d3fceb))


### Bug Fixes

* Make loglevel config option optional ([f6c18d9](https://github.com/case-contract-testing/contract-case/commit/f6c18d97434aebbff054c368b5929251935b41ea))

## [0.13.0](https://github.com/case-contract-testing/contract-case/compare/v0.12.2...v0.13.0) (2023-06-09)


### ⚠ BREAKING CHANGES

* Only expose types in modules. Root imports will need to be updated to include the module name

### Bug Fixes

* Correct issue where core code wasn't included in package ([7f70b3c](https://github.com/case-contract-testing/contract-case/commit/7f70b3c41cfab833dbeca56567bfda075275ac79))
* No longer include coverage directories in package ([b5f42a0](https://github.com/case-contract-testing/contract-case/commit/b5f42a039b966c0fe908231adcc0154a1403846c))
* Remove unused dependencies ([7e51170](https://github.com/case-contract-testing/contract-case/commit/7e511705f71ecb4697375c13d394ba88701441f0))


### Code Refactoring

* Only expose types in modules. Root imports will need to be updated to include the module name ([015dc7a](https://github.com/case-contract-testing/contract-case/commit/015dc7a449805920a5c08cc54ca486ec8bcbc888))

## [0.12.2](https://github.com/case-contract-testing/contract-case/compare/v0.12.1...v0.12.2) (2023-06-01)


### Bug Fixes

* Add link to documentation in warning message about zero-length arrays ([54dd26d](https://github.com/case-contract-testing/contract-case/commit/54dd26dd1d534b6c71f0c9a8655b4a264439b8e2))
* Improve intellisense documentation ([aebaac8](https://github.com/case-contract-testing/contract-case/commit/aebaac83c859a47e85ea2f2ceadbd5aaa70e416a))
* Update documentation for boundary classes ([bffd21b](https://github.com/case-contract-testing/contract-case/commit/bffd21b5dc338046a89e881d708ed4c5fa771aea))

## [0.12.1](https://github.com/TimothyJones/ContractCaseTest/compare/v0.12.0...v0.12.1) (2023-05-19)


### Bug Fixes

* Add link to documentation in warning message about zero-length arrays ([54dd26d](https://github.com/TimothyJones/ContractCaseTest/commit/54dd26dd1d534b6c71f0c9a8655b4a264439b8e2))

## [0.12.0](https://github.com/case-contract-testing/contract-case/compare/v0.11.0...v0.12.0) (2023-05-17)


### ⚠ BREAKING CHANGES

* Add new constructor parameter to allow parents to pass in their version number for debugging. Any uses of the Contract* classes will need to be updated to provide an array of parent package version strings

### Features

* Add new constructor parameter to allow parents to pass in their version number for debugging. Any uses of the Contract* classes will need to be updated to provide an array of parent package version strings ([93485eb](https://github.com/case-contract-testing/contract-case/commit/93485eb9c2cd4f83f5119a3283ea8b4ac8dbdf99))
* Pass version info through to logger ([a6dc4f7](https://github.com/case-contract-testing/contract-case/commit/a6dc4f73a176552d779eabba9273e78f0979b5af))

## [0.11.0](https://github.com/case-contract-testing/contract-case/compare/ContractCase-All-Core-Packages-v0.3.0...ContractCase-All-Core-Packages-v0.11.0) (2023-05-09)


### ⚠ BREAKING CHANGES

* Remove ContractDefiner and ContractVerifier boundaries. Please use @contract-case/case-boundary instead.
* Remove jest DSL. Please use @contract-case/contract-case-jest instead.
* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package
* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again
* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Add ability to pass in printer for log lines ([d6d8b7f](https://github.com/case-contract-testing/contract-case/commit/d6d8b7f455a8cb30f80a4db3dbb459e3493502f5))
* Add Case Example Mock Types package ([7f79879](https://github.com/case-contract-testing/contract-case/commit/7f7987951174de9d57f68106e29c7104745a6296))
* Add cli package ([600c429](https://github.com/case-contract-testing/contract-case/commit/600c4298089cfc8bc34a50cd4bf3cacf920b75ad))
* Add crash messages when the core fails ([8147c9d](https://github.com/case-contract-testing/contract-case/commit/8147c9d59183d31c212fbba31f468f2b0b2c4a58))
* Add documentation package ([f5b1f61](https://github.com/case-contract-testing/contract-case/commit/f5b1f615c8c8b1db60c04a9d3cee4c087cf8d9eb))
* Add HttpResponse and HttpRequest matchers ([21cc98a](https://github.com/case-contract-testing/contract-case/commit/21cc98abe8614813ba3196baa0ba6dce31b1bfea))
* Add ILogPrinter interface to allow printing log lines ([f17d1fa](https://github.com/case-contract-testing/contract-case/commit/f17d1fac53dfaf54e9ddd2c0742baa5a75a149a8))
* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type ([861be95](https://github.com/case-contract-testing/contract-case/commit/861be95135b0bdbe2eba615f455163f44ffe6945))
* Add separate package for jest + javascript DSL ([e175bf7](https://github.com/case-contract-testing/contract-case/commit/e175bf7befd9c6a9e1be96f490845289ca248aaf))
* Add StateHandlers type to boundary ([75a2a9b](https://github.com/case-contract-testing/contract-case/commit/75a2a9b3f529a626a1ae49ed20088675b95d7f0c))
* Add triggerAndTest function to the connectors layer ([fd9f1f2](https://github.com/case-contract-testing/contract-case/commit/fd9f1f255919a53e22a52de295738b41aba721f0))
* Add types for states ([55048e1](https://github.com/case-contract-testing/contract-case/commit/55048e1041f73f0edfede8ca2cf605ae6be138f6))
* Allow specification of more options via environment variables ([553a7b1](https://github.com/case-contract-testing/contract-case/commit/553a7b15fbb6ba6069c0bee2c683b57ece942c3c))
* **boundary:** Add initial types for ContractDefiner ([06643c0](https://github.com/case-contract-testing/contract-case/commit/06643c0073f85b960619a0849084d791b7769e99))
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again ([6cfd730](https://github.com/case-contract-testing/contract-case/commit/6cfd730d83d3ad5381479c592d8f3939263a4ea3))
* Export  TestInvoker, MultiTestInvoker and CaseContractDescription ([4818aa8](https://github.com/case-contract-testing/contract-case/commit/4818aa8d2400517ef6ef21fc16f1536b04e99962))
* Export all error types ([8b2ca24](https://github.com/case-contract-testing/contract-case/commit/8b2ca241189d4d51a04d9bfdbbe9e82ad10f5a7d))
* export AnyMatcherOrData and AnyStringMatcher ([e116600](https://github.com/case-contract-testing/contract-case/commit/e11660022ac56ab5a9ee9465921d98025485cc58))
* Export ContractDefinerConnector and ContractVerifierConnector. The ContractDefiner and ContractVerifier classes will be moved to the case-boundaries package soon ([6805f1c](https://github.com/case-contract-testing/contract-case/commit/6805f1c50d72aa9313b767bfc8157614d9924b40))
* Export error and config types ([b46fe4a](https://github.com/case-contract-testing/contract-case/commit/b46fe4a99bce89cd8a14be71de6f710af16d3acd))
* Export LogPrinter type ([77eb3ce](https://github.com/case-contract-testing/contract-case/commit/77eb3ce7a68d5d445bf690c2e054f5d0fb18fd76))
* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/case-contract-testing/contract-case/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))
* Introduce BrokerError and expose it ([6fc09ba](https://github.com/case-contract-testing/contract-case/commit/6fc09ba2bd9c2eac360e1f7c47c12fe88f9927cd))
* Introduce triggerAndTest types for invoking both a trigger and the test together (useful for invoking from other languages) ([855ffd8](https://github.com/case-contract-testing/contract-case/commit/855ffd8a22957c9b12b778fd4f200755e5f2b72d))
* Map errors appropriately at the boundary ([c9df9ff](https://github.com/case-contract-testing/contract-case/commit/c9df9ffa16aa68183b8410b25c37e6cc03f36182))
* Remove ContractDefiner and ContractVerifier boundaries. Please use @contract-case/case-boundary instead. ([b560086](https://github.com/case-contract-testing/contract-case/commit/b560086eb1676f357ba4e32d5b734a7a29aa5ea8))
* Remove jest DSL. Please use @contract-case/contract-case-jest instead. ([5ae33bb](https://github.com/case-contract-testing/contract-case/commit/5ae33bbebfbe416331d4ba01e55f613302409e24))
* Substantially improve options parsing for ContractCase CLI ([30085ae](https://github.com/case-contract-testing/contract-case/commit/30085aeb878b84885578f3a5341be1d091d5b984))


### Bug Fixes

* Actually include the jsii manifest ([a1cf72f](https://github.com/case-contract-testing/contract-case/commit/a1cf72f25628d3f1a1d93084ef6dd3334bb6a495))
* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/case-contract-testing/contract-case/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))
* Add contract name to log location for publish contract/verification ([d736689](https://github.com/case-contract-testing/contract-case/commit/d7366896304897c9a7fff6148966d5dbd62ce1f8))
* Correct a bug where the default settings overrode settings provided via environment variables ([9784637](https://github.com/case-contract-testing/contract-case/commit/97846379f0be62cf01c0837dee6261fac66b2c9d))
* Correct an issue where combined triggers were not passed through to the test runner ([0dfe32f](https://github.com/case-contract-testing/contract-case/commit/0dfe32f03a8d4ae60a58cd82e9a7e3307e6227f0))
* Correct issue where verifier didn't pass down all invoker properties ([238b42b](https://github.com/case-contract-testing/contract-case/commit/238b42b87a07abb5ceca337fd9c8459167a13092))
* Correct peer dependency for test-equivalence-matchers ([5c913a0](https://github.com/case-contract-testing/contract-case/commit/5c913a02309118655bd1a72adf9375155463bece))
* Correct problem where not having a broker CI token would not fail the publish ([b22d956](https://github.com/case-contract-testing/contract-case/commit/b22d9565f60a474890aa9fd7962294e87f88d23d))
* Don't throw configuration errors for missing broker details when publish=NEVER ([4893bc3](https://github.com/case-contract-testing/contract-case/commit/4893bc306fb4d4943d4f7be9b9baab76313b5a2e))
* Export MatchContextByExact ([88cc4ae](https://github.com/case-contract-testing/contract-case/commit/88cc4aef1e99eaee1102bba39c29d1c5aeeae208))
* Fix a bug where configuration from environment variables was ignored during contract definition ([2fe5d32](https://github.com/case-contract-testing/contract-case/commit/2fe5d328b2e63e731b7969b63cb1156b668d139c))
* Improve error message if you try to publish verification results for a contract that has no broker ([03714d1](https://github.com/case-contract-testing/contract-case/commit/03714d1e98ccff92e84f35d0d79abd2a97607df7))
* Improve error messages when contract downloader fails ([93eb28b](https://github.com/case-contract-testing/contract-case/commit/93eb28bda6920e9d49c057f9b024c5176cee6649))
* Improve formatting of error output ([04897a4](https://github.com/case-contract-testing/contract-case/commit/04897a421f31a4c7a998b024eb9ca0e2ade2af80))
* Improve logger output ([f68752d](https://github.com/case-contract-testing/contract-case/commit/f68752d774a3d8c5a953a47b164ac0e81bbcc227))
* Include .jsii manifest in release ([cce31c0](https://github.com/case-contract-testing/contract-case/commit/cce31c0f89f55e45579a3c8aa7b20a143f7bf5a4))
* Swap colours for maintainerDebug and deepMaintainerDebug ([c77f6fb](https://github.com/case-contract-testing/contract-case/commit/c77f6fbbffd4d96b3396d408a29dd6456e3fe96a))
* Update previously unused mock definitions to match the prefixed format ([bf693d7](https://github.com/case-contract-testing/contract-case/commit/bf693d7be0fc0ef6fd3c218d72e420086228f030))
* Widen types for `stripMatchers` and `checkMatch` (a side-effect of using the new case-entities-internal package) ([26d5b6e](https://github.com/case-contract-testing/contract-case/commit/26d5b6e90612066d703d359421b8be9995b0009a))


### Code Refactoring

* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package ([d6bc4dd](https://github.com/case-contract-testing/contract-case/commit/d6bc4dda780f1836b18640b49882115edee19c42))
* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/contract-case/commit/438fac472f9d58686a705bd57d58696a0499f226))

## [0.3.0](https://github.com/case-contract-testing/case/compare/contract-case-v0.2.0...contract-case-v0.3.0) (2023-05-08)


### ⚠ BREAKING CHANGES

* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package

### Features

* Add crash messages when the core fails ([8147c9d](https://github.com/case-contract-testing/case/commit/8147c9d59183d31c212fbba31f468f2b0b2c4a58))
* Map errors appropriately at the boundary ([c9df9ff](https://github.com/case-contract-testing/case/commit/c9df9ffa16aa68183b8410b25c37e6cc03f36182))


### Bug Fixes

* Correct problem where not having a broker CI token would not fail the publish ([b22d956](https://github.com/case-contract-testing/case/commit/b22d9565f60a474890aa9fd7962294e87f88d23d))
* Don't throw configuration errors for missing broker details when publish=NEVER ([4893bc3](https://github.com/case-contract-testing/case/commit/4893bc306fb4d4943d4f7be9b9baab76313b5a2e))


### Code Refactoring

* Make names of matcher interfaces consistently end in Matcher. This change has no effect on non-typescript consumers of the case-entities-internal package ([d6bc4dd](https://github.com/case-contract-testing/case/commit/d6bc4dda780f1836b18640b49882115edee19c42))

## [0.2.0](https://github.com/case-contract-testing/case/compare/contract-case-v0.1.1...contract-case-v0.2.0) (2023-05-06)


### ⚠ BREAKING CHANGES

* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again
* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Add ability to pass in printer for log lines ([d6d8b7f](https://github.com/case-contract-testing/case/commit/d6d8b7f455a8cb30f80a4db3dbb459e3493502f5))
* Add Case Example Mock Types package ([7f79879](https://github.com/case-contract-testing/case/commit/7f7987951174de9d57f68106e29c7104745a6296))
* Add documentation package ([f5b1f61](https://github.com/case-contract-testing/case/commit/f5b1f615c8c8b1db60c04a9d3cee4c087cf8d9eb))
* Add HttpResponse and HttpRequest matchers ([21cc98a](https://github.com/case-contract-testing/case/commit/21cc98abe8614813ba3196baa0ba6dce31b1bfea))
* Add ILogPrinter interface to allow printing log lines ([f17d1fa](https://github.com/case-contract-testing/case/commit/f17d1fac53dfaf54e9ddd2c0742baa5a75a149a8))
* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type ([861be95](https://github.com/case-contract-testing/case/commit/861be95135b0bdbe2eba615f455163f44ffe6945))
* Add separate package for jest + javascript DSL ([e175bf7](https://github.com/case-contract-testing/case/commit/e175bf7befd9c6a9e1be96f490845289ca248aaf))
* Add StateHandlers type to boundary ([75a2a9b](https://github.com/case-contract-testing/case/commit/75a2a9b3f529a626a1ae49ed20088675b95d7f0c))
* Add triggerAndTest function to the connectors layer ([fd9f1f2](https://github.com/case-contract-testing/case/commit/fd9f1f255919a53e22a52de295738b41aba721f0))
* Add types for states ([55048e1](https://github.com/case-contract-testing/case/commit/55048e1041f73f0edfede8ca2cf605ae6be138f6))
* Allow specification of more options via environment variables ([553a7b1](https://github.com/case-contract-testing/case/commit/553a7b15fbb6ba6069c0bee2c683b57ece942c3c))
* **boundary:** Add initial types for ContractDefiner ([06643c0](https://github.com/case-contract-testing/case/commit/06643c0073f85b960619a0849084d791b7769e99))
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again ([6cfd730](https://github.com/case-contract-testing/case/commit/6cfd730d83d3ad5381479c592d8f3939263a4ea3))
* Export  TestInvoker, MultiTestInvoker and CaseContractDescription ([4818aa8](https://github.com/case-contract-testing/case/commit/4818aa8d2400517ef6ef21fc16f1536b04e99962))
* Export all error types ([8b2ca24](https://github.com/case-contract-testing/case/commit/8b2ca241189d4d51a04d9bfdbbe9e82ad10f5a7d))
* export AnyMatcherOrData and AnyStringMatcher ([e116600](https://github.com/case-contract-testing/case/commit/e11660022ac56ab5a9ee9465921d98025485cc58))
* Export ContractDefinerConnector and ContractVerifierConnector. The ContractDefiner and ContractVerifier classes will be moved to the case-boundaries package soon ([6805f1c](https://github.com/case-contract-testing/case/commit/6805f1c50d72aa9313b767bfc8157614d9924b40))
* Export error and config types ([b46fe4a](https://github.com/case-contract-testing/case/commit/b46fe4a99bce89cd8a14be71de6f710af16d3acd))
* Export LogPrinter type ([77eb3ce](https://github.com/case-contract-testing/case/commit/77eb3ce7a68d5d445bf690c2e054f5d0fb18fd76))
* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/case-contract-testing/case/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))
* Introduce triggerAndTest types for invoking both a trigger and the test together (useful for invoking from other languages) ([855ffd8](https://github.com/case-contract-testing/case/commit/855ffd8a22957c9b12b778fd4f200755e5f2b72d))


### Bug Fixes

* Actually include the jsii manifest ([a1cf72f](https://github.com/case-contract-testing/case/commit/a1cf72f25628d3f1a1d93084ef6dd3334bb6a495))
* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/case-contract-testing/case/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))
* Add contract name to log location for publish contract/verification ([d736689](https://github.com/case-contract-testing/case/commit/d7366896304897c9a7fff6148966d5dbd62ce1f8))
* Correct a bug where the default settings overrode settings provided via environment variables ([9784637](https://github.com/case-contract-testing/case/commit/97846379f0be62cf01c0837dee6261fac66b2c9d))
* Correct an issue where combined triggers were not passed through to the test runner ([0dfe32f](https://github.com/case-contract-testing/case/commit/0dfe32f03a8d4ae60a58cd82e9a7e3307e6227f0))
* Correct issue where verifier didn't pass down all invoker properties ([238b42b](https://github.com/case-contract-testing/case/commit/238b42b87a07abb5ceca337fd9c8459167a13092))
* Correct peer dependency for test-equivalence-matchers ([5c913a0](https://github.com/case-contract-testing/case/commit/5c913a02309118655bd1a72adf9375155463bece))
* Export MatchContextByExact ([88cc4ae](https://github.com/case-contract-testing/case/commit/88cc4aef1e99eaee1102bba39c29d1c5aeeae208))
* Improve error message if you try to publish verification results for a contract that has no broker ([03714d1](https://github.com/case-contract-testing/case/commit/03714d1e98ccff92e84f35d0d79abd2a97607df7))
* Improve error messages when contract downloader fails ([93eb28b](https://github.com/case-contract-testing/case/commit/93eb28bda6920e9d49c057f9b024c5176cee6649))
* Improve formatting of error output ([04897a4](https://github.com/case-contract-testing/case/commit/04897a421f31a4c7a998b024eb9ca0e2ade2af80))
* Improve logger output ([f68752d](https://github.com/case-contract-testing/case/commit/f68752d774a3d8c5a953a47b164ac0e81bbcc227))
* Include .jsii manifest in release ([cce31c0](https://github.com/case-contract-testing/case/commit/cce31c0f89f55e45579a3c8aa7b20a143f7bf5a4))
* Swap colours for maintainerDebug and deepMaintainerDebug ([c77f6fb](https://github.com/case-contract-testing/case/commit/c77f6fbbffd4d96b3396d408a29dd6456e3fe96a))
* Update previously unused mock definitions to match the prefixed format ([bf693d7](https://github.com/case-contract-testing/case/commit/bf693d7be0fc0ef6fd3c218d72e420086228f030))
* Widen types for `stripMatchers` and `checkMatch` (a side-effect of using the new case-entities-internal package) ([26d5b6e](https://github.com/case-contract-testing/case/commit/26d5b6e90612066d703d359421b8be9995b0009a))


### Code Refactoring

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/case/commit/438fac472f9d58686a705bd57d58696a0499f226))

## [0.1.1](https://github.com/case-contract-testing/case/compare/contract-case-v0.1.0...contract-case-v0.1.1) (2023-05-03)


### Features

* Add separate package for jest + javascript DSL ([e175bf7](https://github.com/case-contract-testing/case/commit/e175bf7befd9c6a9e1be96f490845289ca248aaf))
* Add triggerAndTest function to the connectors layer ([fd9f1f2](https://github.com/case-contract-testing/case/commit/fd9f1f255919a53e22a52de295738b41aba721f0))
* Add types for states ([55048e1](https://github.com/case-contract-testing/case/commit/55048e1041f73f0edfede8ca2cf605ae6be138f6))
* Export  TestInvoker, MultiTestInvoker and CaseContractDescription ([4818aa8](https://github.com/case-contract-testing/case/commit/4818aa8d2400517ef6ef21fc16f1536b04e99962))


### Bug Fixes

* Correct an issue where combined triggers were not passed through to the test runner ([0dfe32f](https://github.com/case-contract-testing/case/commit/0dfe32f03a8d4ae60a58cd82e9a7e3307e6227f0))
* Export MatchContextByExact ([88cc4ae](https://github.com/case-contract-testing/case/commit/88cc4aef1e99eaee1102bba39c29d1c5aeeae208))

## [0.1.0](https://github.com/case-contract-testing/case/compare/contract-case-v0.0.1...contract-case-v0.1.0) (2023-04-26)


### ⚠ BREAKING CHANGES

* Add an IResultPrinter type and make it required as part of the constructor for ContractDefiner
* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again
* Change return type of ILogPrinter to Result
* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated

### Features

* Add ability to pass in printer for log lines ([d6d8b7f](https://github.com/case-contract-testing/case/commit/d6d8b7f455a8cb30f80a4db3dbb459e3493502f5))
* Add an IResultPrinter type and make it required as part of the constructor for ContractDefiner ([f5583d2](https://github.com/case-contract-testing/case/commit/f5583d240df98849eb1e55e4655b789afa600e5e))
* Add Case Example Mock Types package ([7f79879](https://github.com/case-contract-testing/case/commit/7f7987951174de9d57f68106e29c7104745a6296))
* Add documentation package ([f5b1f61](https://github.com/case-contract-testing/case/commit/f5b1f615c8c8b1db60c04a9d3cee4c087cf8d9eb))
* Add HttpResponse and HttpRequest matchers ([21cc98a](https://github.com/case-contract-testing/case/commit/21cc98abe8614813ba3196baa0ba6dce31b1bfea))
* Add ILogPrinter interface to allow printing log lines ([f17d1fa](https://github.com/case-contract-testing/case/commit/f17d1fac53dfaf54e9ddd2c0742baa5a75a149a8))
* Add result printer methods to the defaultPrinter. This means that any custom loggers must be extended to also cover the ResultPrinter type ([861be95](https://github.com/case-contract-testing/case/commit/861be95135b0bdbe2eba615f455163f44ffe6945))
* Add StateHandlers type to boundary ([75a2a9b](https://github.com/case-contract-testing/case/commit/75a2a9b3f529a626a1ae49ed20088675b95d7f0c))
* Add SuccessWithAny result type ([d566a7f](https://github.com/case-contract-testing/case/commit/d566a7fb7c33451214f2159588c86b2b11a232b2))
* Add types for triggerAndTest ([3609024](https://github.com/case-contract-testing/case/commit/360902447e6dcc7e0cd4bd200d27d35d1e56223a))
* Allow specification of more options via environment variables ([553a7b1](https://github.com/case-contract-testing/case/commit/553a7b15fbb6ba6069c0bee2c683b57ece942c3c))
* **boundary:** Add initial types for ContractDefiner ([06643c0](https://github.com/case-contract-testing/case/commit/06643c0073f85b960619a0849084d791b7769e99))
* Change return type of ILogPrinter to Result ([43b3d9c](https://github.com/case-contract-testing/case/commit/43b3d9c3a1e2baa5971b01b9064df790368b087a))
* Exit with a warning and success if there is no broker baseurl when downloading contracts. In the future, this will be an error again ([6cfd730](https://github.com/case-contract-testing/case/commit/6cfd730d83d3ad5381479c592d8f3939263a4ea3))
* Export all error types ([8b2ca24](https://github.com/case-contract-testing/case/commit/8b2ca241189d4d51a04d9bfdbbe9e82ad10f5a7d))
* export AnyMatcherOrData and AnyStringMatcher ([e116600](https://github.com/case-contract-testing/case/commit/e11660022ac56ab5a9ee9465921d98025485cc58))
* Export ContractDefinerConnector and ContractVerifierConnector. The ContractDefiner and ContractVerifier classes will be moved to the case-boundaries package soon ([6805f1c](https://github.com/case-contract-testing/case/commit/6805f1c50d72aa9313b767bfc8157614d9924b40))
* Export error and config types ([b46fe4a](https://github.com/case-contract-testing/case/commit/b46fe4a99bce89cd8a14be71de6f710af16d3acd))
* Export LogPrinter type ([77eb3ce](https://github.com/case-contract-testing/case/commit/77eb3ce7a68d5d445bf690c2e054f5d0fb18fd76))
* Export MatchContextByType, DataOrCaseNodeFor and add the HTTP matcher types to the Any* lists ([0ce1ee3](https://github.com/case-contract-testing/case/commit/0ce1ee384017516d3107e8c45e8d308ea6cba4dd))
* Introduce triggerAndTest types for invoking both a trigger and the test together (useful for invoking from other languages) ([855ffd8](https://github.com/case-contract-testing/case/commit/855ffd8a22957c9b12b778fd4f200755e5f2b72d))


### Bug Fixes

* Actually include the jsii manifest ([a1cf72f](https://github.com/case-contract-testing/case/commit/a1cf72f25628d3f1a1d93084ef6dd3334bb6a495))
* Add AnyLeafOrStructure to AnyCaseMatcherOrData, preventing type errors in tests ([b0d3cf0](https://github.com/case-contract-testing/case/commit/b0d3cf0a8a6f1020777ecc53837f1764ccdeb2d3))
* Add contract name to log location for publish contract/verification ([d736689](https://github.com/case-contract-testing/case/commit/d7366896304897c9a7fff6148966d5dbd62ce1f8))
* Correct a bug where the default settings overrode settings provided via environment variables ([9784637](https://github.com/case-contract-testing/case/commit/97846379f0be62cf01c0837dee6261fac66b2c9d))
* Correct peer dependency for test-equivalence-matchers ([5c913a0](https://github.com/case-contract-testing/case/commit/5c913a02309118655bd1a72adf9375155463bece))
* Improve error message if you try to publish verification results for a contract that has no broker ([03714d1](https://github.com/case-contract-testing/case/commit/03714d1e98ccff92e84f35d0d79abd2a97607df7))
* Improve error messages when contract downloader fails ([93eb28b](https://github.com/case-contract-testing/case/commit/93eb28bda6920e9d49c057f9b024c5176cee6649))
* Improve formatting of error output ([04897a4](https://github.com/case-contract-testing/case/commit/04897a421f31a4c7a998b024eb9ca0e2ade2af80))
* Improve logger output ([f68752d](https://github.com/case-contract-testing/case/commit/f68752d774a3d8c5a953a47b164ac0e81bbcc227))
* Include .jsii manifest in release ([cce31c0](https://github.com/case-contract-testing/case/commit/cce31c0f89f55e45579a3c8aa7b20a143f7bf5a4))
* Swap colours for maintainerDebug and deepMaintainerDebug ([c77f6fb](https://github.com/case-contract-testing/case/commit/c77f6fbbffd4d96b3396d408a29dd6456e3fe96a))
* Update previously unused mock definitions to match the prefixed format ([bf693d7](https://github.com/case-contract-testing/case/commit/bf693d7be0fc0ef6fd3c218d72e420086228f030))
* Widen types for `stripMatchers` and `checkMatch` (a side-effect of using the new case-entities-internal package) ([26d5b6e](https://github.com/case-contract-testing/case/commit/26d5b6e90612066d703d359421b8be9995b0009a))


### Code Refactoring

* Rename all internal fields from "case:*" to "_case:*" for compatibility with JSii. Contract files written before this change will need to be regenerated ([438fac4](https://github.com/case-contract-testing/case/commit/438fac472f9d58686a705bd57d58696a0499f226))
