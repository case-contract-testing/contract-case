/**
 * Contains constants for the crash messages
 *
 * @public
 */
export class BoundaryCrashMessage {
  static readonly CRASH_MESSAGE_START = `
---------------------------------------------------
!!!!🚨🚨🚨🚨🚨 ContractCase Crashed 🚨🚨🚨🚨🚨!!!!
---------------------------------------------------

The ContractCase core has failed in an unexpected
way. This is almost certainly a bug in ContractCase.

The details are:
`;

  static readonly CRASH_MESSAGE_END = `

Please open a bug report here:
https://github.com/case-contract-testing/case/issues/new

It would be great if you could include:

* What you were doing when it failed
* The results of re-running with logLevel: "maintainerDebug"

For bonus points and internet karma, a reproducible 
code sample would be very helpful.

Sorry about this.

---------------------------------------------------
!!!!🚨🚨🚨🚨🚨 ContractCase Crashed 🚨🚨🚨🚨🚨!!!!
---------------------------------------------------
`;
}
