<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@contract-case/case-example-mock-types](./case-example-mock-types.md) &gt; [states](./case-example-mock-types.states.md) &gt; [AnyState](./case-example-mock-types.states.anystate.md)

## states.AnyState class

The base class for all ContractCase State Descriptors. You shouldn't need to extend this.

You don't need to read the documentation for this class unless you are working on a wrapper for ContractCase.

**Signature:**

```typescript
export declare abstract class AnyState
```

## Constructors

| Constructor                                                                                       | Modifiers | Description                       |
| ------------------------------------------------------------------------------------------------- | --------- | --------------------------------- |
| [(constructor)(stateType, stateName)](./case-example-mock-types.states.anystate._constructor_.md) |           | Constructs a new state descriptor |

## Properties

| Property                                                            | Modifiers             | Type   | Description                                                          |
| ------------------------------------------------------------------- | --------------------- | ------ | -------------------------------------------------------------------- |
| [stateName](./case-example-mock-types.states.anystate.statename.md) | <code>readonly</code> | string | The name of this state, used to determine which state handler to run |

## Methods

| Method                                                                | Modifiers | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [stringify()](./case-example-mock-types.states.anystate.stringify.md) |           | <p>You shouldn't need to override this method. You don't need to call this method, unless working on a wrapper for ContractCase.</p><p>This method returns the entire state descriptor as a JSON string, as a convenience so that wrapper libraries don't need to figure out how to walk a tree of example objects.</p>                                                                                                                                                                                                                                                                                                                                                                          |
| [toJSON()](./case-example-mock-types.states.anystate.tojson.md)       |           | <p>You shouldn't need to override or call this method.</p><p>It exists because the ContractCase matcher format is not legal in all languages that ContractCase supports.</p><p>It isn't called by any implementation directly, it's used on the javascript side by <code>JSON.stringify()</code>.</p><p>Calling it from a wrapper library will return unhelpful results, as JSii can't map all objects that it returns.</p><p>WARNING: Do not return a string from this method. You must instead return an object that can be serialised to JSON following the matcher format described in \[Extending ContractCase\](https://case.contract-testing.io/docs/advanced-topics/extending-case).</p> |
