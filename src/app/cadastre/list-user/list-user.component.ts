import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { Global } from 'src/app/Shared/Global';
import { Router } from '@angular/router';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit  {
  position: any
  listUsers: any;
  data: any;
  // tslint:disable-next-line:no-inferrable-types
  displayTable: boolean = false;
  constructor(private _userService: UserService, 
              private router: Router, private _alertNotification: AlertNotificationService,
             ) { }

  ngOnInit() {
   this.getUser();
   }
  getUser(): void {
    this._userService.getUser(Global.BASE_USER_ENDPOINT + "user/getinfomation")
    .subscribe(listuser => {      
      this.listUsers = listuser;
      this.listUsers.forEach(element => {
        element.password = "******";
      });
      this.displayTable = true;
    })     
  }

  createUser() {
    this.router.navigateByUrl('/user',{state:{title : 'Novo Usuário', btnTitle :  'Adicionar' ,dbop: DBOperation.create }})
  }
  updateUSer(id: string) {    
    const user = this.listUsers.filter(c => c.id === id)[0];
    this.router.navigateByUrl('/user',{state:{title : 'Editar Usuário', btnTitle :  'Editar' ,dbop: DBOperation.update, user : user }})
  }
  deleteUser(id: string){
    this._alertNotification.confirm('Por favor confirme..', 'Deseja realizar essa operação?').
    then((confirmed) => {
      if(confirmed){
        this._userService.deleteUser(Global.BASE_USER_ENDPOINT + "user/deleteuser", id)
        .subscribe(result => {  
          this._alertNotification.Notification(result.result, 'success');    
          this.getUser();
        }
        , error => {
          this._alertNotification.Notification(error, 'error');
        },
        )  
      }     
    });
    
  }

}
