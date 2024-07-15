import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    // alows as not to handle dependencies  easier
    //   creating  an end point for login and signup using decorator    
    @Post('signup')
    signup() {
        return this.authService.signup()
    }

    @Post('signin')
    signin() {
        return this.authService.signin()
    }


    
   
}