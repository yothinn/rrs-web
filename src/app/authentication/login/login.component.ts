import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenService } from '../authen.service';
import { Router } from '@angular/router';
import { UserPermissionService } from 'app/superadmin/user-permission.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthenService,
        private permission: UserPermissionService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            // username: ['', [Validators.required, Validators.email]],
            // Change to username
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

    }

    /**
     * On login button click
     */
    async login() {
        const data = this.loginForm.getRawValue();
        try {
            // Double check user @ authen and rrs service
            // Check user authen @ authen service
            const authResult = await this.auth.login(data);
            console.log(authResult);
            // Check user @ rrs service
            const perResult = await this.permission.getUserPermission(authResult.username);
            this.router.navigate(['']);
        } catch(error) {
            // TODO : !! Here : alert user unauthorize 
            console.log(error);
        }
    }
}
