import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.page.html',
  styleUrls: ['./edit-course.page.scss'],
})
export class EditCoursePage implements OnInit {

  updateCourseForm: FormGroup;
  id: any;

  constructor(
    private courseAPI: CourseService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getCourseData(this.id);
    this.updateCourseForm = this.fb.group({
      name: [''],
      description: [''],
      image: ['']
    })
  }

  getCourseData(id) {
    this.courseAPI.getOne(id).subscribe(res => {
      this.updateCourseForm.setValue({
        name: res['name'],
        description: res['description'],
        image: res['image']
      });
    });
  }

  updateForm() {
    if (!this.updateCourseForm.valid) {
      return false;
    } else {
      this.courseAPI.update(this.id, this.updateCourseForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateCourseForm.reset();
          this.router.navigate(['/home']);
        })
    }
  }

}
