import { Get, JsonController } from 'routing-controllers';

@JsonController()
export default class SiteController {

  @Get('/')
  index() {
    return {
      message: 'Hello World',
    };
  }

}
