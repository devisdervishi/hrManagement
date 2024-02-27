import { Component } from '@angular/core';
import { AuthserviceAllCompSharedService } from 'src/app/services/componentsSharedServices/authservice-all-comp-shared.service';

@Component({
  selector: 'manager-managerinfo',
  templateUrl: './managerinfo.component.html',
  styleUrls: ['./managerinfo.component.scss'],
})
export class ManagerinfoComponent {
  constructor(private authService_AllComp: AuthserviceAllCompSharedService) {}

  firstName: string | null = this.authService_AllComp.firstname;
  lastName: string | null = this.authService_AllComp.lastname;
  daysOff: number | null = this.authService_AllComp.daysoff;
  username: string | null = this.authService_AllComp.username;
  id: number | null = this.authService_AllComp.id;

  myEncryptor(text: string) {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
      let ascii = text.charCodeAt(i);
      ascii = ascii * 5 + 37;
      encrypted += String.fromCharCode(ascii);
    }

    return 'i3EZUpMYrWhpjMZnhdgNdg' + encrypted + 'HOr7AbPiDPTuac1SEigleA';
  }
}
