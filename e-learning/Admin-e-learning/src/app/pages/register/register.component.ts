import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../modeles/register-request';
import { CommonModule } from '@angular/common';
import { Utilisateur } from '../../modeles/utilisateur';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,NgxPaginationModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit { 
 utilisateurs: Utilisateur[] = [];  
  formRegister!:FormGroup
  listRoles: any 
  registerRequest: RegisterRequest = new RegisterRequest()
  fileToUpload: ReadonlyArray<File> = []
  errorMsg: string = "";
  utilisateur : number = 1
  term: any
  constructor(private authService: AuthserviceService, private fb: FormBuilder, private router: Router){

  }

  ngOnInit(): void {
   this.getUtilisateurs();
    this.getUserByRole()
    this.formRegister = this.fb.group({
      nom: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      role: ['', Validators.required],
      // photo: ['', Validators.required],
    });
  }

  // Méthode pour récupérer les utilisateurs     
  getUtilisateurs(): void {
    this.authService.getUtilisateurs().subscribe(
      (data: Utilisateur[]) => { 
        this.utilisateurs = data.filter(
          (el: any) =>{
            return(
             el.role == 'ETUDIANT' ||  el.role =='ENSEIGNANT' ||  el.role =='PARENT'
            )
       } );
        // this.utilisateurs = this.utilisateurs.filter((el:any) =>{
        //   el.role =='ENSEIGNANT'
        // })
        console.log("Liste des utilisateurs", this.utilisateurs);
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }



  
  getUserByRole(): void {
    this.authService.getAllUserRoles().subscribe((res: any) => {
      this.listRoles = res
      console.log("list of roles", this.listRoles);
    })
  } 
  handlefileInput(files: any) {   //fonction bech ta9ra l image
    this.fileToUpload = <ReadonlyArray<File>>files.target.files
    console.log(this.fileToUpload)
  }
  createNewUser(): void {        
  
    // let formdata = new FormData()
    // formdata.append("nom", this.formRegister.value.nom)
    // formdata.append("prenom", this.formRegister.value.prenom)
    // formdata.append("email", this.formRegister.value.email)
    // formdata.append("password", this.formRegister.value.password)
    //  formdata.append("adresse",this.formRegister.value.adresse)
    //  formdata.append("telephone",this.formRegister.value.telephone)
    //  formdata.append("role",this.formRegister.value.role)
    // formdata.append("photo", this.fileToUpload[0]);
  //  console.log("formRegister", this.formRegister.value);
   console.log("formRegister", this.registerRequest);

    this.authService.register(this.registerRequest).subscribe((resutl: any) => {
      alert("ceration avec succés")
      console.log("reult", resutl);
      this.getUtilisateurs()
      this.router.navigateByUrl("/classe")
    }
    ,
    (error) => {
      if (error.status === 409) {
        this.errorMsg = ('Email already exists, please enter another email');
         alert('Incorrect email or password')
      } else {
        this.errorMsg = 'An error occurred while logging in';
      }
    })
  }
  
}
