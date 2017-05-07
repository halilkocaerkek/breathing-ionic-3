import {LoggerService} from "./logger.service";
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    constructor(private loggerService : LoggerService) {}
}