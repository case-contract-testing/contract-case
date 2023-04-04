interface WireNotice {
  text: string;
}

interface WireSelfLink {
  self: {
    href: string;
    name: string;
  };
}

interface WireContractForVerification {
  verificationProperties: {
    notices: WireNotice[];
  };
  _links: WireSelfLink;
}

interface ContractForPublication {
  consumerName: string;
  providerName: string;
  specification: 'case::contract' | 'pact';
  contentType: 'application/json';
  content: string; // Base64 encoded contract content
}

export interface WireRequestForPublicationAdvanced {
  pacticipantName: string;
  pacticipantVersionNumber: string;
  branch?: string;
  tags: Array<string>;
  buildUrl?: string;
  contracts: Array<ContractForPublication>;
}
/*
    {
      tests: [
        {
          testDescription: '1',
          status: 'passed',
          pact_uri: pact_uri,
          pact_interaction: pact_interaction
        }
      ]
    }
    */

export interface WireRequestPublishVerificationResults {
  providerApplicationVersion: string;
  success: boolean;
  branch?: string;
  tags: Array<string>;
  buildUrl?: string;
  executionDate: string; // DateTime.now;
  verifiedByImplementation: 'ContractCase';
  verifiedByVersion: string;
}

export interface WireForVerificationRequest {
  consumerVersionSelectors: Record<string, string | boolean>[];
  providerVersionTags: string[];
}

export interface WireForVerificationResponse {
  _embedded: {
    pacts: WireContractForVerification[];
  };
  _links: WireSelfLink;
}
