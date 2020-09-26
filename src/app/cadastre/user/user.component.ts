import { UserType } from './../../_enum/userType';
import { UserService } from './../../_services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from 'src/app/Shared/Global';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { CompanySummaryInformation } from 'src/app/_models/companySummaryInformation';
import { UserCompany } from 'src/app/_models/userCompany';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  position: any
  public maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
  user: User;
  registerForm: FormGroup;
  password: boolean;
  types = []
  public data: any;
  comapanies: CompanySummaryInformation[];
  companiesList = new Array<UserCompany>();
  constructor(private authService: AuthService, private router: Router, private userService: UserService,private _notificationService: AlertNotificationService,
    private fb: FormBuilder) { 
      const nav = this.router.getCurrentNavigation();
      this.data = nav.extras.state;
      this.password = false;
    }

  ngOnInit() {
    this.createUserForm();
    this.loadCompanyUserMaster();
    if (this.data.dbop === DBOperation.create){
        this.registerForm.reset();
     }
     else {
       this.registerForm.setValue(this.data.user);
     }   
  }
  
  createUserForm() {
    this.registerForm = this.fb.group({
      id: [''],
      group: ['', Validators.required],
      userMasterId: [''],
      name: ['', Validators.required],
      document: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      picture: [''],
      isActive: ['', Validators.required], 
      companies: []

    })
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }
  onSubmit(){
    if (this.data.dbop === DBOperation.create){
        this.newUser();
    }    
    else if(this.data.dbop === DBOperation.update){
      this.updateUser();
    }
        
  }

  newUser() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value); 
      this.user.companies = this.companiesList;
      this.userService.createUser(Global.BASE_USER_ENDPOINT + "user/newuser", this.user).subscribe(result => {
        this._notificationService.Notification(result.result, 'success');
        this.router.navigate(['/users']);
      }, error => {
        this._notificationService.Notification(error, 'error');
      }, () => {
        this.router.navigate(['/users']);
      })
    }
  }

  updateUser() {
    this.user = Object.assign({}, this.registerForm.value); 
    this.user.companies = this.companiesList;
    this.userService.updateUser(Global.BASE_USER_ENDPOINT + "user/updateuser", this.user).subscribe(result => {
      this._notificationService.Notification(result.result, 'success');
      this.router.navigate(['/users']);
    }, error => {
      this._notificationService.Notification(error, 'error');
    }, () => {
      this.router.navigate(['/users']);
    })
  }

  loadCompanyUserMaster() {
    let id = Global.GetCurrentUser().user.id;
    this.userService.getCompanyByUserId(Global.BASE_USER_ENDPOINT + "user/getinfomationcompany", id).subscribe(companies => {
       this.comapanies = companies;
       
      if(this.data.dbop === DBOperation.update){
          this.password = true;
          this.FillCompaniesList();
      }
             
    });
  }

  FillCompaniesList() {
    this.user = Object.assign({}, this.registerForm.value);
      this.user.companies.forEach(x => {
         this.comapanies.filter(c => c.cnpj === x.document)[0].select = true;         
         this.companiesList.push({document: x.document});
      });
    }

  AddRemoveCompanies(select: boolean, cnpj: string)
  {
    const s = new UserCompany();
    if (select)
    {
        this.companiesList = this.companiesList.filter(c => c.document !== cnpj);
        this.comapanies.filter(c => c.cnpj === cnpj)[0].select = false;
       
     } else {
        s.document = cnpj;
        this.companiesList.push(s);
        this.comapanies.filter(c => c.cnpj === cnpj)[0].select = true;
     }
  }
  userTypes() {
    return this.types = [
      new UserType(1, "Admistrador"),
      new UserType(2, "Contador"),
      new UserType(3, "Dep. Fiscal"),
      new UserType(4, "Dep. Contábil")
    ]
  }

}
