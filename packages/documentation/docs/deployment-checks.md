---
sidebar_position: 5.5
---

# Deployment checks

:::caution INCOMPLETE DOCUMENT

While ContractCase is in beta, some of the documentation is incomplete or bullet points only.

Each breaking change during the beta, one more document will be completed. If this notice is present in a document, it is not yet considered complete. If you are having trouble using ContractCase or you would like a particular document prioritised, please [open an issue](https://github.com/case-contract-testing/case/issues/new)
:::

Currently, deployment checks are performed using the [Pact Broker CLI](https://docs.pact.io/pact_broker/client_cli/readme). For example:

```bash
pact-broker can-i-deploy  --pacticipant $YOUR_SERVICE_NAME --version $YOUR_SERVICE_VERSION --to-environment $YOUR_ENVIRONMENT
```

On successful deployment, you will need to tell the broker that you deployed:

```
pact-broker record-deployment --environment=$YOUR_ENVIRONMENT --pacticipant=$YOUR_SERVICE_NAME --version=$YOUR_SERVICE_VERSION
```

In the future, ContractCase will have its own way of contacting the Broker for deployment checks and to record deployments.
