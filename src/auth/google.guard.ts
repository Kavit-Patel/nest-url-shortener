import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
    constructor(){
        super({keepSessionInfo:true})
    }
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const result = (await super.canActivate(context) as boolean)
        const request= context.switchToHttp().getRequest()
        await super.logIn(request)
        if (request.user) {
            return true;
          }
        return result
    }
}