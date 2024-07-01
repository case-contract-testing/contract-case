## API Report File for "@contract-case/case-definition-dsl"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { ARRAY_CONTAINS_TYPE } from '@contract-case/case-entities-internal';
import { ARRAY_EACH_ENTRY_MATCHES_TYPE } from '@contract-case/case-entities-internal';
import { ARRAY_LENGTH_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { ARRAY_LENGTH_PARAMETER_INFINITE } from '@contract-case/case-entities-internal';
import { BASE64_ENCODED_TYPE } from '@contract-case/case-entities-internal';
import { BOOLEAN_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { COMBINE_MATCHERS_TYPE } from '@contract-case/case-entities-internal';
import { CONTEXT_VARIABLE_TYPE } from '@contract-case/case-entities-internal';
import { HTTP_REQUEST_MATCHER_TYPE } from '@contract-case/case-core-plugin-http-dsl';
import { HTTP_RESPONSE_MATCHER_TYPE } from '@contract-case/case-core-plugin-http-dsl';
import { HTTP_STATUS_CODE_MATCHER_TYPE } from '@contract-case/case-core-plugin-http-dsl';
import { INTEGER_MATCH_TYPE } from '@contract-case/case-entities-internal';
import { InternalContractCaseCoreSetup } from '@contract-case/case-plugin-base';
import { JSON_STRINGIFIED_TYPE } from '@contract-case/case-entities-internal';
import { LOOKUP_MATCHER_TYPE } from '@contract-case/case-plugin-base';
import { MOCK_HTTP_CLIENT } from '@contract-case/case-core-plugin-http-dsl';
import { MOCK_HTTP_SERVER } from '@contract-case/case-core-plugin-http-dsl';
import { NULL_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { NUMBER_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { OBJECT_KEYS_MATCH_TYPE } from '@contract-case/case-entities-internal';
import { OBJECT_VALUES_MATCH_TYPE } from '@contract-case/case-entities-internal';
import { SETUP_NAMED_STATE } from '@contract-case/case-plugin-base/dist/src/core/states';
import { SETUP_VARIABLE_STATE } from '@contract-case/case-plugin-base/dist/src/core/states';
import { SHAPED_ARRAY_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { STRING_CONTAINS_TYPE } from '@contract-case/case-entities-internal';
import { STRING_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { STRING_PREFIX_TYPE } from '@contract-case/case-entities-internal';
import { STRING_SUFFIX_TYPE } from '@contract-case/case-entities-internal';
import { URL_ENCODED_STRING_TYPE } from '@contract-case/case-core-plugin-http-dsl';

// @public
class And extends AnyMatcher {
    // Warning: (ae-forgotten-export) The symbol "AnyMatcherOrData" needs to be exported by the entry point index-api-extractor.d.ts
    //
    // @internal (undocumented)
    readonly '_case:matcher:children': Array<AnyMatcherOrData>;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof COMBINE_MATCHERS_TYPE;
    constructor(matchers: AnyMatcherOrData[]);
    toJSON(): unknown;
}

// @public
class AnyBoolean extends AnyMatcherWithExample {
    // @internal (undocumented)
    readonly '_case:context:matchBy' = "type";
    // @internal (undocumented)
    readonly '_case:matcher:example': boolean;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo' = "boolean";
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof BOOLEAN_MATCHER_TYPE;
    constructor(example: boolean);
    toJSON(): unknown;
}

// @public
class AnyInteger extends AnyMatcherWithExample {
    // @internal (undocumented)
    readonly '_case:context:matchBy' = "type";
    // @internal (undocumented)
    readonly '_case:matcher:example': number;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo' = "number";
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof INTEGER_MATCH_TYPE;
    constructor(example: number);
    toJSON(): unknown;
}

// @public
abstract class AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:type': string;
    constructor(matcherType: string);
    toJSON(): unknown;
}

// @public
abstract class AnyMatcherWithExample extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:example': unknown;
    constructor(matcherType: string, example: unknown);
    toJSON(): unknown;
}

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
class AnyNull extends AnyMatcherWithExample {
    // @internal (undocumented)
    readonly '_case:context:matchBy' = "type";
    // @internal (undocumented)
    readonly '_case:matcher:example': null;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo' = "null";
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof NULL_MATCHER_TYPE;
    constructor();
    toJSON(): unknown;
}

// @public
class AnyNumber extends AnyMatcherWithExample {
    // @internal (undocumented)
    readonly '_case:context:matchBy' = "type";
    // @internal (undocumented)
    readonly '_case:matcher:example': number;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo' = "number";
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof NUMBER_MATCHER_TYPE;
    constructor(example: number);
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

// @public
class AnyString extends AnyMatcherWithExample {
    // @internal (undocumented)
    readonly '_case:context:matchBy' = "type";
    // @internal (undocumented)
    readonly '_case:matcher:example': string;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo' = "string";
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof STRING_MATCHER_TYPE;
    constructor(example: string);
    toJSON(): unknown;
}

// @public
class ArrayContains extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:matchers': Array<AnyMatcherOrData>;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof ARRAY_CONTAINS_TYPE;
    constructor(matchers: Array<AnyMatcherOrData>);
    toJSON(): unknown;
}

// @public
class ArrayEachEntryMatches extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:matcher': AnyMatcherOrData;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof ARRAY_EACH_ENTRY_MATCHES_TYPE;
    constructor(matcher: AnyMatcherOrData);
    toJSON(): unknown;
}

// @public
class ArrayEachEntryMatchesWithExample extends AnyMatcherWithExample {
    // @internal (undocumented)
    readonly '_case:matcher:example': Array<AnyMatcherOrData>;
    // @internal (undocumented)
    readonly '_case:matcher:matcher': AnyMatcherOrData;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof ARRAY_EACH_ENTRY_MATCHES_TYPE;
    constructor(matcher: AnyMatcherOrData, example: Array<AnyMatcherOrData>);
    toJSON(): unknown;
}

// @public
class ArrayLength extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:maxLength': number | typeof ARRAY_LENGTH_PARAMETER_INFINITE;
    // @internal (undocumented)
    readonly '_case:matcher:minLength': number;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof ARRAY_LENGTH_MATCHER_TYPE;
    constructor(options: ArrayLengthOptions);
    toJSON(): unknown;
}

// @public
interface ArrayLengthOptions {
    readonly maxLength?: number;
    readonly minLength?: number;
}

declare namespace arrays {
    export {
        ArrayContains,
        ArrayEachEntryMatches,
        ArrayEachEntryMatchesWithExample,
        ArrayLengthOptions,
        ArrayLength,
        ArrayStartsWith
    }
}

// @public
class ArrayStartsWith extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:children': Array<AnyMatcherOrData>;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof SHAPED_ARRAY_MATCHER_TYPE;
    constructor(matchers: Array<AnyMatcherOrData>);
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
class Base64Encoded extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:child': AnyMatcherOrData;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo' = "string";
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof BASE64_ENCODED_TYPE;
    constructor(child: AnyMatcherOrData);
    toJSON(): unknown;
}

// @public
class BasicAuthHeaderValue extends StringPrefix {
    // Warning: (ae-forgotten-export) The symbol "AnyStringMatcher" needs to be exported by the entry point index-api-extractor.d.ts
    constructor(username: AnyStringMatcher, password: AnyStringMatcher);
    toJSON(): unknown;
}

// @public
class BearerTokenHeaderValue extends StringPrefix {
    constructor(token: AnyStringMatcher);
    toJSON(): unknown;
}

// @public
abstract class CascadingContextMatcher extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:child': AnyMatcherOrData;
    // @internal (undocumented)
    readonly '_case:matcher:type': string;
    constructor(child: AnyMatcherOrData, contextModifiers: Record<string, string>, currentRunModifiers: Record<string, string>);
    toJSON(): unknown;
}

// @public
class ChangeLogLevel extends CascadingContextMatcher {
    constructor(logLevel: string, child: AnyMatcherOrData);
    toJSON(): unknown;
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

declare namespace convenience {
    export {
        And,
        ChangeLogLevel,
        NamedMatch,
        ReferenceMatch,
        StateVariable,
        WithExample
    }
}

// @public
class ExactlyLike extends CascadingContextMatcher {
    constructor(content: AnyMatcherOrData);
    toJSON(): unknown;
}

declare namespace http {
    export {
        WillReceiveHttpRequest,
        HttpExample,
        WillSendHttpRequest
    }
}

declare namespace http_2 {
    export {
        HttpStatusCode,
        BasicAuthHeaderValue,
        BearerTokenHeaderValue,
        HttpRequestExample,
        HttpRequest,
        HttpResponseExample,
        HttpResponse,
        UriEncodedString
    }
}

// @public (undocumented)
interface HttpExample {
    readonly request: AnyMatcherOrData;
    readonly response: AnyMatcherOrData;
}

// @public
class HttpRequest extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof HTTP_REQUEST_MATCHER_TYPE;
    constructor(requestExample: HttpRequestExample);
    // (undocumented)
    readonly body?: AnyMatcherOrData;
    // (undocumented)
    readonly headers?: AnyMatcherOrData;
    // (undocumented)
    readonly method: AnyStringMatcher;
    // (undocumented)
    readonly path: AnyStringMatcher;
    // (undocumented)
    readonly query?: AnyMatcherOrData;
    toJSON(): unknown;
    // (undocumented)
    readonly uniqueName?: string;
}

// @public (undocumented)
interface HttpRequestExample {
    readonly body?: AnyMatcherOrData;
    readonly headers?: AnyMatcherOrData;
    readonly method: AnyStringMatcher;
    readonly path: AnyStringMatcher;
    readonly query?: AnyMatcherOrData;
    readonly uniqueName?: string;
}

// @public
class HttpResponse extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof HTTP_RESPONSE_MATCHER_TYPE;
    constructor(responseExample: HttpResponseExample);
    // (undocumented)
    readonly body?: AnyMatcherOrData;
    // (undocumented)
    readonly headers?: AnyMatcherOrData;
    // (undocumented)
    readonly status: AnyMatcherOrData;
    toJSON(): unknown;
    // (undocumented)
    readonly uniqueName?: string;
}

// @public (undocumented)
interface HttpResponseExample {
    readonly body?: AnyMatcherOrData;
    readonly headers?: AnyMatcherOrData;
    // (undocumented)
    readonly status: AnyMatcherOrData;
    readonly uniqueName?: string;
}

// @public
class HttpStatusCode extends AnyMatcherWithExample {
    // @internal (undocumented)
    readonly '_case:matcher:example': number;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo': 'HttpStatusCode';
    // @internal (undocumented)
    readonly '_case:matcher:rule': string | string[];
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof HTTP_STATUS_CODE_MATCHER_TYPE;
    constructor(statusCode: string | string[]);
    toJSON(): unknown;
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

declare namespace internals {
    export {
        AnyMatcher,
        AnyMatcherWithExample,
        CascadingContextMatcher
    }
}

declare namespace matchers {
    export {
        arrays,
        internals,
        convenience,
        http_2 as http,
        modifiers,
        objects,
        primitives,
        strings
    }
}
export { matchers }

declare namespace mocks {
    export {
        base,
        http
    }
}
export { mocks }

declare namespace modifiers {
    export {
        ShapedLike,
        ExactlyLike
    }
}

// @public
class NamedMatch extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:child': AnyMatcherOrData | undefined;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof LOOKUP_MATCHER_TYPE;
    // @internal (undocumented)
    readonly '_case:matcher:uniqueName': string;
    constructor(name: string, child: AnyMatcherOrData);
    toJSON(): unknown;
}

// @public
class ObjectEachKeyMatches extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:matcher': AnyMatcherOrData;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof OBJECT_KEYS_MATCH_TYPE;
    constructor(matcher: AnyMatcherOrData);
    toJSON(): unknown;
}

// @public
class ObjectEachValueMatches extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:matcher': AnyMatcherOrData;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof OBJECT_VALUES_MATCH_TYPE;
    constructor(matcher: AnyMatcherOrData);
    toJSON(): unknown;
}

declare namespace objects {
    export {
        ObjectEachKeyMatches,
        ObjectEachValueMatches
    }
}

declare namespace primitives {
    export {
        AnyInteger,
        AnyNumber,
        AnyBoolean,
        AnyNull
    }
}

// @public
class ReferenceMatch extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof LOOKUP_MATCHER_TYPE;
    // @internal (undocumented)
    readonly '_case:matcher:uniqueName': string;
    constructor(name: string);
    toJSON(): unknown;
}

// @public
class ShapedLike extends CascadingContextMatcher {
    constructor(content: AnyMatcherOrData);
    toJSON(): unknown;
}

declare namespace states {
    export {
        InState,
        InStateWithVariables,
        AnyState
    }
}
export { states }

// @public
class StateVariable extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof CONTEXT_VARIABLE_TYPE;
    // @internal (undocumented)
    readonly '_case:matcher:variableName': string;
    constructor(name: string);
    toJSON(): unknown;
}

// @public
class StringContaining extends AnyMatcherWithExample {
    // @internal (undocumented)
    readonly '_case:matcher:contains': string;
    // @internal (undocumented)
    readonly '_case:matcher:example': string;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo' = "string";
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof STRING_CONTAINS_TYPE;
    constructor(substring: string, example: string);
    toJSON(): unknown;
}

// @public
class StringifiedJson extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:child': AnyMatcherOrData;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo' = "string";
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof JSON_STRINGIFIED_TYPE;
    constructor(child: AnyMatcherOrData);
    toJSON(): unknown;
}

// @public
class StringPrefix extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:prefix': string;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo': 'string';
    // @internal (undocumented)
    readonly '_case:matcher:suffix': AnyStringMatcher;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof STRING_PREFIX_TYPE;
    constructor(prefix: string, suffix: AnyStringMatcher);
    toJSON(): unknown;
}

declare namespace strings {
    export {
        AnyString,
        Base64Encoded,
        StringContaining,
        StringifiedJson,
        StringPrefix,
        StringSuffix
    }
}

// @public
class StringSuffix extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:prefix': string | AnyStringMatcher;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo' = "string";
    // @internal (undocumented)
    readonly '_case:matcher:suffix': string;
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof STRING_SUFFIX_TYPE;
    constructor(prefix: AnyStringMatcher, suffix: string);
    toJSON(): unknown;
}

// @public
class UriEncodedString extends AnyMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:accepts' = "string";
    // @internal (undocumented)
    readonly '_case:matcher:child': AnyStringMatcher;
    // @internal (undocumented)
    readonly '_case:matcher:resolvesTo' = "string";
    // @internal (undocumented)
    readonly '_case:matcher:type': typeof URL_ENCODED_STRING_TYPE;
    constructor(child: AnyStringMatcher);
    toJSON(): unknown;
}

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

// @public
class WithExample extends CascadingContextMatcher {
    // @internal (undocumented)
    readonly '_case:matcher:example': AnyMatcherOrData;
    constructor(matcher: AnyMatcherOrData, example: AnyMatcherOrData);
    toJSON(): unknown;
}

```