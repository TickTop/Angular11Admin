import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm:FormGroup = new FormGroup({});
  constructor(private formBuild:FormBuilder,
              private userService:UserService,
              private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuild.group ({
      'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'email': new FormControl('',[Validators.required, Validators.email]),
      'phone': new FormControl('',[Validators.required, Validators.maxLength(10)])
    })
  }
  createUser(){
    this.userService.addUser(this.addUserForm.value).subscribe (data=>{
      //console.log("User Created");
     this._snackBar.open ("User Created Successfully");
    }, err=>{
     this._snackBar.open ("Unable to Create User")
    })
  }

}
