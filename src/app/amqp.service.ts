import { Injectable } from '@angular/core';

@Injectable()
export class AmqpService {

    getTasks(): Promise<string[]> {
        
        return Promise.resolve([""]);
    } 

}
