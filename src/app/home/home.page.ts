import { Component, OnInit } from '@angular/core';
import { CourseService } from '../courses/course.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  courses: any = [];

  constructor(
    private courseService: CourseService
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.courseService.findAll().subscribe((res) => {
      this.courses = res;
    })
  }

  deleteCourse(course, i) {
    if (window.confirm('Do you want to delete user?')) {
      this.courseService.delete(course._id)
        .subscribe(() => {
          this.courses.splice(i, 1);
          console.log('Course deleted!')
        }
        )
    }
  }

}