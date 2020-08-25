import { Component, OnInit, NgZone } from '@angular/core';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.page.html',
  styleUrls: ['./list-course.page.scss'],
})
export class ListCoursePage implements OnInit {
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
