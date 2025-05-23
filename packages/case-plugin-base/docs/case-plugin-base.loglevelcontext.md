<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-plugin-base](./case-plugin-base.md) &gt; [LogLevelContext](./case-plugin-base.loglevelcontext.md)

## LogLevelContext type

LogLevelContext is the subset of the overall context object that's needed for logging. It exists so that it's possible to call log and error related functions no matter what context you're in.

**Signature:**

```typescript
export type LogLevelContext = {
    '_case:currentRun:context:parentVersions': Array<string>;
    '_case:currentRun:context:logLevel': LogLevel;
    '_case:currentRun:context:location': Array<string>;
};
```
**References:** [LogLevel](./case-plugin-base.loglevel.md)

