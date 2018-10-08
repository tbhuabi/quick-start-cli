import { Get, Controller, Request, Response, Next } from '@nestjs/common';
import { StaticService } from './static.service';

@Controller()
export class StaticController {
  constructor(private readonly staticService: StaticService) {
  }

  @Get('**')
  toIndex(@Request() request, @Response() response, @Next() next) {
    return this.staticService.transform(request, response, next);
  }
}