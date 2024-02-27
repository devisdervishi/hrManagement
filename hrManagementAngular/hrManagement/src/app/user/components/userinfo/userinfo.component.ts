import { Component} from '@angular/core';
import { AuthserviceAllCompSharedService } from 'src/app/services/componentsSharedServices/authservice-all-comp-shared.service';

@Component({
  selector: 'user-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
})
export class UserinfoComponent {
  constructor(private authService_AllComp: AuthserviceAllCompSharedService) {}

  firstName: string | null = this.authService_AllComp.firstname;
  lastName: string | null = this.authService_AllComp.lastname;
  daysOff: number | null = this.authService_AllComp.daysoff;
  username: string | null = this.authService_AllComp.username;
}
