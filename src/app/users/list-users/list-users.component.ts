import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';


export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'actions'];
  dataSource = ELEMENT_DATA;

  listUsers: User[] = [];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.listUsers().subscribe (data=> {
      this.listUsers=data;
      });
  }

}
