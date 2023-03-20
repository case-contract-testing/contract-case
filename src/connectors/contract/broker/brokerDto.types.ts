type WireNotice = {
  text: string;
};

type WireSelfLink = {
  self: {
    href: string;
    name: string;
  };
};

type WireContractForVerification = {
  verificationProperties: {
    notices: WireNotice[];
  };
  _links: WireSelfLink;
};

export type WireForVerificationRequest = {
  consumerVersionSelectors: Record<string, string | boolean>[];
  providerVersionTags: string[];
};

export type WireForVerificationResponse = {
  _embedded: {
    pacts: WireContractForVerification[];
  };
  _links: WireSelfLink;
};
