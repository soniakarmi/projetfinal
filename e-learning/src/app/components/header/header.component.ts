import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationRequest } from '../../Modeles/authentication-request';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RegisterRequest } from '../../Modeles/register-request';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authRequest: AuthenticationRequest = new AuthenticationRequest();
  registerRequest: RegisterRequest = new RegisterRequest();
  submitted = false;
  formLogin!: FormGroup // login
  formRegister!: FormGroup //register
  errorMsg: string = "";
  listRoles: any

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formRegister = this.fb.group({
      nom: ['', Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      prenom: ['', [Validators.required, Validators.min(18), Validators.maxLength(20)]],
      adresse: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      role: ['', Validators.required],
    });

    // this.register()
    this.getUserByRole()
  }
  logins():void {
    this.authService.login(this.authRequest).subscribe((res: any) => {
      console.log('User sign in successful:', res);
      this.authService.setUserToken(res);
      //localStorage.setItem('userconnect', JSON.stringify(res.user));
       Swal.fire('Thank you...', 'You connected succesfully!', 'success')
       setTimeout(() => {
        location.reload();
        }, 9000);            
    //  alert('connected')    
      this.router.navigate(['/courses']);    
           
     },     
     
      (error) => {
        if (error.status === 401) {    
          this.errorMsg = ('Incorrect email or password');
        } else {
          this.errorMsg = 'An error occurred while logging in';
        }
      }
    );
  }
  /*  register(): void {
     this.formRegister = this.fb.group({
       nom: ['', Validators.required, Validators.minLength(3), Validators.maxLength(20)],
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
       prenom: ['', [Validators.required, Validators.min(18),Validators.maxLength(20)]],
       role: ['', Validators.required],
     });
     
   }
   get f(): { [key: string]: AbstractControl } {
     return this.formRegister.controls;
   } */


  signUp(): void {
    this.authService.register(this.registerRequest).subscribe(
      (res: any) => {
        console.log('User registered successfully');
        console.log('user registered successfully', res);

        Swal.fire('Succès ! Veuillez vérifier votre e-mail pour terminer votre inscription');
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status === 409) {
          this.errorMsg = ('Email already exists, please enter another email');
          // alert('Incorrect email or password')
        } else {
          this.errorMsg = 'An error occurred while logging in';
        }
      }
    );
  }
  getUserByRole(): void {
    this.authService.getAllRoles().subscribe((res: any) => {
      this.listRoles = res
      console.log("list of roles", this.listRoles);
    })
  }  

}
 