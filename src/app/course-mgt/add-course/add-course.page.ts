import { Component, OnInit, NgZone } from '@angular/core';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
})
export class AddCoursePage implements OnInit {
  courseForm: FormGroup

  constructor(
      private courseAPI: CourseService,
      private router: Router,
      public fb: FormBuilder,
      private zone: NgZone
    ) {
      
      this.courseForm = this.fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          image: ['', Validators.required],
      })
  }

  ngOnInit() { }

  onFormSubmit() {
    if (!this.courseForm.valid) {
      return false;
    } else {
      this.courseAPI.insertOne(this.courseForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.courseForm.reset();
            this.router.navigate(['/home']);
          })
        });
    }
  }

}
