import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UsersServiceService } from 'src/app/Services/users-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  firstname : string | undefined
  lastname : string | undefined;
  description : string | undefined;
  image: File |undefined;

  message : any;
  color : any;
  
  User : any;
  UserSub : Subscription | undefined;

  ngOnInit(): void {
    this.UserSub = this.UserService.Get_User_not_logged(this.data.UserID).subscribe((data:any) =>{
      this.User = data;
      this.firstname = this.User.firstname;
      this.lastname = this.User.lastname;
      this.description = this.User.description;
    },(error:any) => {
      console.error(error);
      
    });
  }
  ngOnDestroy(){
    if (this.UserSub)
      this.UserSub!.unsubscribe();
  }

  onImageChanged(event: any) {
    this.image = event.target.files[0];
  }

  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,private UserService : UsersServiceService,private http : HttpClient
  ) {}

  onConfirm() {
    const uploadData = new FormData();
    if (this.image == undefined){
      uploadData.append('firstname',this.firstname!);
      uploadData.append('lastname',this.lastname!);
      uploadData.append('description',this.description!);
    }
    else {
      uploadData.append('firstname',this.firstname!);
      uploadData.append('lastname',this.lastname!);
      uploadData.append('description',this.description!);
      uploadData.append('profile_img',this.image!,this.image!.name)
    }
    this.http.patch("http://127.0.0.1:8000/LoginSystem/UpdateUser/"+this.data.UserID, uploadData).subscribe(
      (response) => {
        console.log('Profil został zaktualizowany', response);
      },
      (error) => {
        console.error('Błąd podczas aktualizacji profilu', error);
      }
    );
  

    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

}
