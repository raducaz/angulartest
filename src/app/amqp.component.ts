import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AmqpService } from './amqp.service';

@Component({
    moduleId: module.id,
    selector: 'my-tasks',
    templateUrl: 'amqp.component.html',
    styleUrls: ['amqp.component.css']
})

export class AmqpComponent implements OnInit {

    tasks: string[];

    constructor(private router: Router, private amqpService: AmqpService) { }

    ngOnInit(): void {
        var q = 'tasks';
        var url = "amqp://bocfbvfs:auVw_AaA9G9kT6MPajWLHVg4ZdydQI-W@crocodile.rmq.cloudamqp.com/bocfbvfs";
        var open = require('amqplib').connect(url);

        // Consumer
        open.then(function (conn) {
            var ok = conn.createChannel();
            ok = ok.then(function (ch) {
                ch.assertQueue(q);
                ch.consume(q, function (msg) {
                    if (msg !== null) {
                        this.tasks.add(msg.content.toString());
                        ch.ack(msg);
                    }
                });
            });
            return ok;
        }).then(null, console.warn);
    }
    
}