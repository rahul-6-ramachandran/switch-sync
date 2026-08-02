import { Injectable } from '@nestjs/common';

import { HttpService } from '../../common/http/http.service';
import { WorkdayDetailResponse } from './workday.types';

@Injectable()
export class WorkdayDetailService {
  constructor(private readonly http: HttpService) {}

  async fetch(
    boardUrl: string,
    externalPath: string,
  ): Promise<WorkdayDetailResponse> {
    const url = boardUrl.replace('/jobs', `/job${externalPath}`);

    return this.http.get<WorkdayDetailResponse>(url);
  }
}
