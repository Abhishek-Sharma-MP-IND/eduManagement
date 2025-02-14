import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any;
  showMessage: boolean = false;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,

    private authService: AuthService,
    private route :Router
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [null, Validators.required],
      username: ['', Validators.required]
    });
  }

  onRegister(): void {
    if (this.itemForm.valid) {
      this.formModel = this.itemForm.value;
      // Call HTTP service to register
      this.httpService.registerUser(this.formModel).subscribe(
        (response) => {

          this.responseMessage = "Registration successfull!";
          this.showMessage = true;
          setTimeout(() => {
            this.route.navigateByUrl('/login');
          }, 2000);
        },
        (error) => {
          this.responseMessage = error;
          this.showMessage = true;
        }
      );
    }
  }
}