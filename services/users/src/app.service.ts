import { Injectable } from '@nestjs/common';

@Injectable()
class AppService {
  private result = 'Hello World!';

  getHello(): string {
    return this.result;
  }
}

export default AppService;
