import { Controller, Get } from '@nestjs/common';
//在这个controller，我们中获取主页。
//nestjs运行在express之上。因此如果需要在controller中使用request和response对象，则可哟使用它们。
@Controller('')
export class AppController {
  @Get()
  home() {
    return 'welcome to my movie api!';
  }
}
