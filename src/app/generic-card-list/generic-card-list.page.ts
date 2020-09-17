import { Component, OnInit, Input } from '@angular/core';
import { DataService, GenericFilterBody } from '../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface GenericCardProps {
  // Common
  collectionKeyword:string
  requestBody:GenericFilterBody
  pageTitle:string
  colSize:number

  // Title
  upperTitle:string
  upperSubtitle:string

  //Links
  link1:string
  link2:string

  // Avatar
  avatarImgProperty: string
  avatarTitleProperty: string
  avatarSubtitleProperty:string
  
  // Content
  imgProperty:string
  titleProperty: string
  subtitleProperty: string

  // fixedContentToShow
  fixedData:any[]
}

@Component({
  selector: 'app-generic-card-list',
  templateUrl: './generic-card-list.page.html',
  styleUrls: ['./generic-card-list.page.scss'],
})

export class GenericCardListPage implements OnInit {
  props:GenericCardProps
  genericList:any[] = []

  constructor(private route: ActivatedRoute, private router: Router,private dataService: DataService) {

    this.route.queryParams.subscribe(params => {
      let navigationState:GenericCardProps = this.router.getCurrentNavigation().extras.state as GenericCardProps
      if (navigationState) 
      {
        this.props = navigationState
      }
    });

   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if(this.props.fixedData.length === 0){
      this.dataService.findAllFilter(this.props.collectionKeyword, this.props.requestBody).subscribe((res) => {
        this.genericList = res;
      })
    }
  }
  
}
