---
sidebar_position: 5.5
---

# Deployment checks

Once you've defined and verified your contracts, you can use the verification status to determine if it is safe to deploy. This is the main value of contract testing - deployment checks prevent you from deploying a broken or untested combination.

You can use the ContractCase CLI to determine if it is safe to deploy:

```bash
npx @contract-case/cli can-deploy  $YOUR_SERVICE_VERSION \
   --environment $TARGET_ENVIRONMENT
```

This will use the inferred current version in the repository. If you are deploying something that isn't the current head of the repository, you can override the version:

you can provide an explicit version:

```bash
npx @contract-case/cli can-deploy  $YOUR_SERVICE_VERSION \
   --environment $TARGET_ENVIRONMENT \
   --override-version $YOUR_SERVICE_VERSION
```

## How the check works

A deploy check looks at the version(s) of any services already deployed, and
checks whether they have been verified against the service you're deploying.

For the purposes of deploy checks, a failed verification is the same as an
unverified contract. However, they're reported differently, because an
unverified contract might potentially pass if you run the verification.

- If the deploying service is a consumer, the check confirms that the deploying service's providers are all deployed; and that the deploying service's contract(s) have all been verified successfully by the already deployed providers
- If the deploying service is a provider, the check confirms that it is compatible with all the contracts from any already deployed consumers

Your service may be both a consumer and a provider; in this case, it must pass both checks.

Some services are their own consumer and provider - one easy example is a
service that defers work for itself via a queue. The checks are unchanged for
this case - it must have successfully verified the contract for itself.

## Making dramatic changes

Sometimes, you'll want to make a dramatic change to a service, such as renaming an HTTP endpoint.
The safe approach here is to either:

- First deploy a client that can speak to both the old and the new server, or
- First deploy a server that can speak to both the old and the new client

Then, the old version of the other side can be retired in favour of the new.

This approach lets you safely make drastic changes
safely, without breaking the rules of the check.

## Circular dependencies

Circular dependencies aren't a problem for contract testing (although they're often recommended against for other reasons). The approach above for making dramatic changes can help resolve any complexities as you introduce contract testing.

## Initial deployments

From the rules above, you can infer that:

- A consumer can't deploy if its provider has never deployed - because the services it relies on are not there.
- A provider may deploy if its consumer has never deployed, because nothing is relying on it.

For accurate, safe deployment from scratch, you can just deploy the service(s) that nothing relies on first. If your initial design already has a circular dependency, it's safest to evolve your system so that you're not introducing the full cycle at once.

Of course, during initial development (where your service isn't receiving real traffic, and any API designs may be fluid), you could just disable deploy checks.

## Contract testing only exposes these issues

Note that the challenges with initial states and any circular dependencies already exist whether or not you have contract testing. Contract testing just puts a spotlight on incompatible changes.

Many teams are happy with a minute or two of incompatibility in deployment - especially when a service isn't receiving real traffic yet.
