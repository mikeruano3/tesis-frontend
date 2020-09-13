import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course-mgt/course.service';
import { Course } from '../course-mgt/interfaces/course';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.page.html',
  styleUrls: ['./home-landing.page.scss'],
})
export class HomeLandingPage implements OnInit {
  courseList: Course[] = [];
  findedCouseItems: Course[] = [];
  isItemAvailable = false;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
  
  constructor(
    private courseService: CourseService
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.courseService.findAll().subscribe((res) => {
      this.courseList = res;
    })
  }

  restoreItems(){
    this.findedCouseItems = this.courseList
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.restoreItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
        this.isItemAvailable = true;
        this.findedCouseItems = this.findedCouseItems.filter((item) => {
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
        this.isItemAvailable = false;
    }
}

}
