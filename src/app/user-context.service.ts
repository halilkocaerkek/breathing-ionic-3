import { Injectable } from '@angular/core';
import {UserService} from "./user.service"; 
import {LoggerService} from "./logger.service";

@Injectable()
export class UserContextService {
constructor(private userService: UserService, private loggerService: LoggerService) {
}
}