## API Report File for "@contract-case/case-plugin-dsl-types"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export interface AnyCaseMatcher {
    // (undocumented)
    '_case:matcher:type': string;
}

// Warning: (ae-incompatible-release-tags) The symbol "AnyCaseMatcherOrData" is marked as @public, but its signature references "AnyLeafOrStructure" which is marked as @internal
//
// @public
export type AnyCaseMatcherOrData = AnyCaseMatcher | AnyData | AnyLeafOrStructure;

// Warning: (ae-forgotten-export) The symbol "JsonSerialisablePrimitive" needs to be exported by the entry point index.d.ts
// Warning: (ae-forgotten-export) The symbol "JsonMap" needs to be exported by the entry point index.d.ts
// Warning: (ae-forgotten-export) The symbol "JsonArray" needs to be exported by the entry point index.d.ts
//
// @public
export type AnyData = JsonSerialisablePrimitive | JsonMap | JsonArray;

// Warning: (ae-internal-missing-underscore) The name "AnyLeafOrStructure" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export type AnyLeafOrStructure = JsonSerialisablePrimitive | JsonOrMatcherArray | JsonOrMatcherMap;

// @public
export type AnyMockDescriptor = {
    '_case:mock:type': string;
    '_case:run:context:setup': InternalContractCaseCoreSetup;
    request?: AnyCaseMatcher;
    response?: AnyCaseMatcher;
};

// @public (undocumented)
export type AnyState = NameOnlyState | StateWithVariables;

// @public (undocumented)
export type AnyStateType = typeof SETUP_NAMED_STATE | typeof SETUP_VARIABLE_STATE;

// @public
export type BaseSetupInfo = {
    variables: Record<string, VariableValue>;
};

// @public
export type CaseMockDescriptorFor<KnownMockDescriptors extends AnyMockDescriptor, T extends string> = Extract<KnownMockDescriptors, HasTypeForMockDescriptor<T>>;

// @public
export interface HasTypeForMockDescriptor<T extends string> {
    // (undocumented)
    '_case:mock:type': T;
}

// @public (undocumented)
export type HasTypeForState<T extends AnyStateType> = {
    '_case:state:type': T;
};

// @public
export interface InternalContractCaseCoreBehaviour {
    stateVariables: 'state' | 'default';
    triggers: 'provided' | 'generated';
    type: string;
}

// @public
export interface InternalContractCaseCoreSetup {
    read: InternalContractCaseCoreBehaviour;
    write: InternalContractCaseCoreBehaviour;
}

// @public
export const isCaseMock: (maybeMock: unknown) => maybeMock is AnyMockDescriptor;

// @public
export const isLookupableMatcher: (maybeMatcher: unknown) => maybeMatcher is LookupableMatcher;

// @public
export type JsonOrMatcherArray = Array<AnyCaseMatcherOrData>;

// @public
export type JsonOrMatcherMap = {
    [key: string]: AnyCaseMatcherOrData;
};

// Warning: (ae-internal-missing-underscore) The name "LOOKUP_MATCHER_TYPE" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const LOOKUP_MATCHER_TYPE: "_case:Lookup";

// @public
export interface LookupableMatcher {
    // (undocumented)
    '_case:matcher:child'?: AnyCaseMatcherOrData;
    // Warning: (ae-incompatible-release-tags) The symbol ""_case:matcher:type"" is marked as @public, but its signature references "LOOKUP_MATCHER_TYPE" which is marked as @internal
    //
    // (undocumented)
    '_case:matcher:type': typeof LOOKUP_MATCHER_TYPE;
    // (undocumented)
    '_case:matcher:uniqueName': string;
}

// @public (undocumented)
export type NameOnlyState = HasTypeForState<typeof SETUP_NAMED_STATE> & {
    readonly stateName: string;
};

// @public
export type ResolvesTo<T extends string> = {
    '_case:matcher:resolvesTo': T;
};

// @public (undocumented)
export const SETUP_NAMED_STATE: "_case:NamedState";

// @public (undocumented)
export const SETUP_VARIABLE_STATE: "_case:StateWithVariables";

// @public
export type SetupInfoFor<AllSetupInfo, T extends string> = Extract<AllSetupInfo, HasTypeForMockDescriptor<T>> & BaseSetupInfo;

// @public (undocumented)
export type StateWithVariables = HasTypeForState<typeof SETUP_VARIABLE_STATE> & {
    readonly stateName: string;
    readonly variables: Record<string, AnyCaseMatcherOrData>;
};

// Warnings were encountered during analysis:
//
// src/mocks/setup.types.ts:18:3 - (ae-forgotten-export) The symbol "VariableValue" needs to be exported by the entry point index.d.ts

// (No @packageDocumentation comment for this package)

```