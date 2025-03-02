---
sidebar_position: 5.5
---

# Deployment checks

Currently, deployment checks are performed using the [Pact Broker CLI](https://docs.pact.io/pact_broker/client_cli/readme). For example:

```bash
pact-broker can-i-deploy  --pacticipant $YOUR_SERVICE_NAME --version $YOUR_SERVICE_VERSION --to-environment $YOUR_ENVIRONMENT
```

On successful deployment, you will need to tell the broker that you deployed:

```
pact-broker record-deployment --environment=$YOUR_ENVIRONMENT --pacticipant=$YOUR_SERVICE_NAME --version=$YOUR_SERVICE_VERSION
```

In the future, ContractCase will have its own way of contacting the Broker for deployment checks and to record deployments.
