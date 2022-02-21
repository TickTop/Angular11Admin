import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
   userId:any;
   userDetails:any;
   editUserForm:FormGroup=new FormGroup({});
   dataLoaded = false;

  constructor( private activatedRoute:ActivatedRoute,
               private userService:UserService,
               private formBuilder:FormBuilder,
               private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
        this.userId=data.id;
    });
    if(this.userId!==''){
      this.userService.viewUser(this.userId)
         .toPromise()
         .then(data=>{
           this.userDetails=data;
         // console.log(this.userDetails.name);
           this.editUserForm = this.formBuilder.group({
             'name':new FormControl(this.userDetails.name),
             'email':new FormControl(this.userDetails.email)
           })
           this.dataLoaded=true;
         })
         .catch (err=>{
           console.log(err);
         })
    }
  }
        updateUser(){
          this.userService.updateUser(this.userId, this.editUserForm.value)
                  .subscribe(data=>{
                   this._snackBar.open("User updated successfully");
                  }, err=>{
                   this._snackBar.open("Unable to update user");
                  })
         }    
}  
