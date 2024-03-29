## API Report File for "@contract-case/case-example-mock-types"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AnyMatcherOrData } from '@contract-case/test-equivalence-matchers';
import { InternalContractCaseCoreSetup } from '@contract-case/case-entities-internal';
import { MOCK_HTTP_CLIENT } from '@contract-case/case-entities-internal';
import { MOCK_HTTP_SERVER } from '@contract-case/case-entities-internal';
import { SETUP_NAMED_STATE } from '@contract-case/case-entities-internal';
import { SETUP_VARIABLE_STATE } from '@contract-case/case-entities-internal';

// @public
abstract class AnyMockDescriptor {
    // @internal (undocumented)
    readonly '_case:mock:type': string;
    // @internal (undocumented)
    readonly '_case:run:context:setup': InternalContractCaseCoreSetup;
    constructor(mockType: string, setup: ContractCaseCoreSetup);
    stringify(): string;
    toJSON(): unknown;
}

// @public
abstract class AnyState {
    // @internal (undocumented)
    readonly '_case:state:type': string;
    constructor(stateType: string, stateName: string);
    readonly stateName: string;
    stringify(): string;
    toJSON(): unknown;
}

declare namespace base {
    export {
        ContractCaseCoreBehaviour,
        ContractCaseCoreSetup,
        AnyMockDescriptor
    }
}

// @public
interface ContractCaseCoreBehaviour {
    readonly mockType: string;
    readonly stateVariables: string;
    readonly triggers: string;
}

// @public (undocumented)
interface ContractCaseCoreSetup {
    readonly read: ContractCaseCoreBehaviour;
    readonly write: ContractCaseCoreBehaviour;
}

declare namespace http {
    export {
        WillReceiveHttpRequest,
        HttpExample,
        WillSendHttpRequest
    }
}

// @public (undocumented)
interface HttpExample {
    readonly request: AnyMatcherOrData;
    readonly response: AnyMatcherOrData;
}

// @public
class InState extends AnyState {
    // @internal (undocumented)
    readonly '_case:state:type': typeof SETUP_NAMED_STATE;
    constructor(stateName: string);
}

// @public
class InStateWithVariables extends AnyState {
    // @internal (undocumented)
    readonly '_case:state:type': typeof SETUP_VARIABLE_STATE;
    constructor(stateName: string, variables: Record<string, AnyMatcherOrData>);
    // (undocumented)
    readonly variables: Record<string, AnyMatcherOrData>;
}

declare namespace mocks {
    export {
        base,
        http
    }
}
export { mocks }

declare namespace states {
    export {
        InState,
        InStateWithVariables,
        AnyState
    }
}
export { states }

// @public
class WillReceiveHttpRequest extends AnyMockDescriptor {
    // @internal (undocumented)
    readonly '_case:mock:type': typeof MOCK_HTTP_CLIENT;
    // @internal (undocumented)
    readonly '_case:run:context:setup': {
        write: {
            type: typeof MOCK_HTTP_CLIENT;
            stateVariables: 'state';
            triggers: 'generated';
        };
        read: {
            type: typeof MOCK_HTTP_SERVER;
            stateVariables: 'default';
            triggers: 'provided';
        };
    };
    constructor(httpExample: HttpExample);
    // (undocumented)
    readonly request: AnyMatcherOrData;
    // (undocumented)
    readonly response: AnyMatcherOrData;
}

// @public
class WillSendHttpRequest extends AnyMockDescriptor {
    // @internal (undocumented)
    readonly '_case:mock:type': typeof MOCK_HTTP_SERVER;
    // @internal (undocumented)
    readonly '_case:run:context:setup': {
        write: {
            type: typeof MOCK_HTTP_SERVER;
            stateVariables: 'default';
            triggers: 'provided';
        };
        read: {
            type: typeof MOCK_HTTP_CLIENT;
            stateVariables: 'state';
            triggers: 'generated';
        };
    };
    constructor(httpExample: HttpExample);
    // (undocumented)
    readonly request: AnyMatcherOrData;
    // (undocumented)
    readonly response: AnyMatcherOrData;
}

```
