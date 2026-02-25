export class YourApi {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  getUser(_arg0: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
}
