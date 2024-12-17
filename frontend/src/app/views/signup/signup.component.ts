import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DeveloperComponent } from 'src/app/views/developer/developer.component';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessRegister = false;
  isSignupFailed = false;
  dev: boolean = false;
  modifForm = false;
  modifPassword = false;
  changedRows = 0;
  login = true;
  register = false;

  isSelectedFile: boolean = true;
  selectedFile: File | null = null;
  image: string = '';

  loginForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
  );

  user: User = new User(); // Instanciez un nouvel utilisateur

  registerForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      image: new FormControl(),
      developer: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      changePassword: new FormControl(),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    }
  , { validators: [this.passwordMatchValidator.bind(this), this.changeDev.bind(this)]});

  submitted = false;  

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private apiService: ApiserviceService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      if(this.router.url.split('/')[1] === 'usermodif') { //If we are on the route to change user informations
        this.modifForm = true;
        this.user = this.tokenStorage.getUser();
        this.registerForm.controls['username'].setValue(this.user.username);
        this.registerForm.controls['developer'].setValue(String(this.user.dev));
        this.register = true;
        this.login = false;
        this.authService.getEmail(this.user.ID).subscribe(
          res => {
            if(res.data) {
              this.registerForm.controls['email'].setValue(res.data[0].email);
            }
          }
        )
        this.changeConfirmPasswordControl();
        this.registerForm.get('changePassword')?.valueChanges.subscribe(selectedValue => {
          this.modifPassword = selectedValue;
          //let confirmPassword = this.registerForm.get('confirmPassword') as FormArray
          this.changeConfirmPasswordControl();
        })
      }
      else {  //If we are registering
        this.isLoggedIn = true;
        this.dev = this.tokenStorage.getUser().dev; //If the user is a developer
      }
    }
    
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  toggleRegisterLogin(): void {
    if(this.register) {
      this.register = false;
      this.login = true;
    }
    else if(this.login) {
      this.login = false;
      this.register = true; 
    }
  }

  // Function used to choose a picture in the computer
  onFileSelected(event: any): void {
    
    this.isSelectedFile = false;


    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {

      };
      reader.readAsDataURL(this.selectedFile);
      this.uploadFile();
    }
  }

  isUploading: boolean = false;

  // Method used to send pictures to the database
  uploadFile() {
    if (this.selectedFile && !this.isUploading) {
      this.isUploading = true; // Set the flag to indicate that file upload is in progress

      this.isSelectedFile = true;

      this.apiService.uploadFile(this.selectedFile).subscribe(
        (response) => {

          // Handle the response from the server if needed
          console.log('File uploaded successfully:', response);

          // Add the image URL to the images array
          const newFileName = response.newFileName;
          if (newFileName) {
            this.image = '../assets/images/'+newFileName;
            
          }

          this.isUploading = false; // Reset the flag after successful upload
        },
        (error) => {
          console.log('Error uploading file:', error);
          this.isUploading = false; // Reset the flag in case of upload error
        }
      );
    }
  }

  changeConfirmPasswordControl(): void {
    if(this.modifPassword) {
      this.registerForm.get('confirmPassword')?.setValidators(Validators.required);
      this.registerForm.addValidators(this.passwordMatchValidator.bind(this));
    }
    else {
      this.registerForm.get('confirmPassword')?.setValidators(null);
      this.registerForm.removeValidators(this.passwordMatchValidator.bind(this));
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if(this.modifForm && !this.modifPassword) {
      return null
    }
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({'passwordMismatch': true});
      return { 'passwordMismatch': true };
    }
    else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }

  changeDev(control: AbstractControl): ValidationErrors | null {
    const developer = control.get('developer');

    if (developer?.value === '0' && Number(this.user.dev) === 1) {
      developer?.setErrors({'developerChange': true});
      return { 'developerChange': true };
    }
    else {
      developer?.setErrors(null);
      return null;
    }
  }

  onSubmitLogin(): void {
    //const {username, password} = this.form;
    const username = this.loginForm.get('username');
    const password = this.loginForm.get('password');

    if(username?.value && password?.value) {
    this.authService.login(username.value, password.value).subscribe(
      res => {                //res has the result data of the SQL query
        if(res.data) {
          this.tokenStorage.saveToken(res.data[0].accessToken); //Save the JWT
          delete res.data[0]['accessToken'];  //Don't save the token inside the user data
          this.tokenStorage.saveUser(res.data[0]);  //Save the data of the new logged user

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.dev = this.tokenStorage.getUser().dev;
          this.reloadPageHome();
        }
        else {
          this.isLoginFailed = true;  //To show to the user it doesn't work
        }
      }
    )
    }
    else {
      this.isLoginFailed = true;
    }
  }

  onSubmitRegister() {
    this.submitted = true;

    const username = this.registerForm.get('username');
    const password = this.registerForm.get('password');
    let userExist = false;

    if(this.modifForm) {
      const password = this.registerForm.get('password');

      if(password?.value) {
        if(this.modifPassword) {  //If the password changed, we have nothing to check
          this.authService.updateUser(this.registerForm.value, this.user.ID, this.image).subscribe(
            res => {
              if(res.data) {
                this.isSuccessRegister = true;
                this.changedRows = res.data[0]['changedRows'];
                delete res.data[0]['changedRows'];
                this.tokenStorage.saveUser(res.data[0]);  //Save the new data of the user
                setTimeout(() => {
                  this.router.navigate(['/user', this.user.ID])
                }, 1500);
              }
              else {
                this.isSignupFailed = true;
              }
            }
          );
        }
        else {  //If the password doesn't change, we have to check if it is correct
          this.authService.verifyUserPassword(this.user.ID, password.value).subscribe(
            res => {
              if(res.data) {
                password.setErrors(null);
                this.authService.updateUser(this.registerForm.value, this.user.ID, this.image).subscribe(
                  resUpdate => {
                    if(resUpdate.data) {
                      this.isSuccessRegister = true;
                      this.changedRows = resUpdate.data[0]['changedRows'];
                      delete res.data[0]['changedRows'];
                      this.tokenStorage.saveUser(resUpdate.data[0]);  //Save the new data of the user
                      setTimeout(() => {
                        this.router.navigate(['/user', this.user.ID])
                      }, 1500);
                    }
                    else {
                      this.isSignupFailed = true;
                    }
                  }
                );
              }
              else {
                password.setErrors({'correct': true});
                this.isSignupFailed = true;
              }
            }
          )
        }
      }
      else {
        password?.setErrors({'correct': true});
      }
    }
    else {
      if(username?.value) {
        this.authService.verifyUsername(username.value).subscribe(
          res => {                //res has the result data of the SQL query
            if(res.data) {
              userExist = true;
              username.setErrors({userExist: true});
            }
            else {
              userExist = false;
              username.setErrors(null);
            }

            // stop here if form is invalid
            if (this.registerForm.invalid || username?.getError('userExist')) {
                return;
            }

            // send the value in the db and get user token and data to store in cookies
            this.authService.register(this.registerForm.value, this.image).subscribe(
              resRegister => {
                if(!resRegister.data) {
                  this.isSignupFailed = true;
                } else {
                  this.isSuccessRegister = true;

                  this.tokenStorage.saveToken(resRegister.data[0].accessToken); //Save the JWT
                  delete resRegister.data[0]['accessToken'];  //Don't save the token inside the user data
                  this.tokenStorage.saveUser(resRegister.data[0]);  //Save the data of the new logged user

                  this.isLoginFailed = false;
                  this.isLoggedIn = true;
                  this.dev = this.tokenStorage.getUser().dev;
                  this.reloadPageHome();
                }
              }
            )
          }
        )
      }
    }
  }

  reloadPageHome(): void {
    /*this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/']));*/
    window.location.reload();
  }
}
