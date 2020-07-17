import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenService } from '../authen.service';
import { Router } from '@angular/router';
import { UserPermissionService } from 'app/main/user-permission.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

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

         // Set the private defaults
         this._unsubscribeAll = new Subject();
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
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * On login button click
     */
    login() {
        const data = this.loginForm.getRawValue();

        // Double check user @ authen and rrs service
        // Check user authen @ authen service
        this.auth.login(data)
            .then((authResult) => {
                // Check user @ rrs service
                // console.log(authResult);
                this.permission.loginUser(authResult.username)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((res) => {
                        // console.log(res);
                        this.router.navigate(['']);
                    });
            })
            .catch((err) => {
                // TODO : !! Here : alert user unauthorize 
                // TODO : throw error and global intercept error;
                console.log(err);
            });
    }
}
