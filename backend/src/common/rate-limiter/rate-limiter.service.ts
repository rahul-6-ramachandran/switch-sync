import { Injectable } from "@nestjs/common";

@Injectable()
export class RateLimiterService {

  private readonly COMPANY_DELAY = 500;

  async wait(): Promise<void> {
    await new Promise(resolve =>
      setTimeout(resolve, this.COMPANY_DELAY),
    );
  }

}