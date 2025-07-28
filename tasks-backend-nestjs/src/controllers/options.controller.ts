import { Controller, Options, HttpCode } from '@nestjs/common';

@Controller()
export class OptionsController {
  @Options('*')
  @HttpCode(200)
  handleOptions() {
    return {};
  }
}
