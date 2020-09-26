import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserAccess } from 'src/app/_models/userAccess';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  formLogin: FormGroup;
  model: any = {};
  userAccess: UserAccess;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private _alertNotification: AlertNotificationService) { }

  ngOnInit() {
    this.formLogin = this.fb.group({     // {5}
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.formLogin.controls; }

  login(){
    console.log('chamou');
    this.authService.login(this.GetUserAccess()).subscribe(next => {
      console.log("Logado");
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/default';
      this.router.navigate([this.returnUrl]);
    }, erro => {
      this._alertNotification.Notification(erro, 'info');
        console.log("Deu erro");
    })
  }

  GetUserAccess(): UserAccess {
    const user = new UserAccess();
    user.email = this.f.email.value;
    user.password = this.f.password.value;
    user.userName = this.f.email.value;
    return user;
  }
}
