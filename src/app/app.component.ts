import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
    urlParams = new URLSearchParams(window.location.search);
    signatureEndpoint = '';
    apiKey = 'jbF71KimS_iNI8H07-PuJw';
    apiSecret = "DwPWVcNM6pfoXYf4L8KOopOmd7gwjtBacTbo";
    meetingNumber = parseInt(this.urlParams.get("sid"));
    role = parseInt(this.urlParams.get("suser"));
    leaveUrl = 'https://globalnurses.xcelanceweb.com';
    userName = this.urlParams.get("sname");
    userEmail = '';
    passWord = '111111';

    constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {}

    ngOnInit() {}

    getSignature() {
        const e = this;
        ZoomMtg.generateSignature({
            meetingNumber:this.meetingNumber,
            apiKey:this.apiKey,
            apiSecret:this.apiSecret,
            role:this.role,
            success(t) {
                e.startMeeting(t.result)
            }
        });
    }

    startMeeting(signature) {
        document.getElementById('zmmtg-root').style.display = 'block'
        ZoomMtg.init({
            leaveUrl: this.leaveUrl,
            isSupportAV: true,
            success: (success) => {
                // console.log(success)
                ZoomMtg.join({
                    signature: signature,
                    meetingNumber: this.meetingNumber,
                    userName: this.userName,
                    apiKey: this.apiKey,
                    userEmail: this.userEmail,
                    passWord: this.passWord,
                    success: (success) => {
                        // console.log(success)
                        console.log('success')
                    },
                    error: (error) => {
                        // console.log(error)
                        console.log('error')
                    }
                })

            },
            error: (error) => {
                // console.log(error)
                console.log('not error')
            }
        })
    }
}
