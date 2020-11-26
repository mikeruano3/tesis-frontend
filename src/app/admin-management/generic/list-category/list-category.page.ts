import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CategorySchema } from 'src/app/schemas/category';
import { APPCONSTANTS } from '../../../constants/app-constants';
import { DataService, GenericFilterBody } from '../../../shared/services/data.service';
import { CategoryGenericProps } from '../interfaces/category-props.interface';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.page.html',
  styleUrls: ['./list-category.page.scss'],
})
export class ListCategoryPage implements OnInit {
  genericList:any[] = []
  isItemAvailable = false
  findedItems:any[] = []
  props:CategoryGenericProps

  constructor(private loadingController: LoadingController, private route: ActivatedRoute, 
    private router: Router, public alertController: AlertController,private dataService: DataService) {
      this.route.queryParams.subscribe(params => {
        let navigationState:CategoryGenericProps = this.router.getCurrentNavigation().extras.state as CategoryGenericProps
        if (navigationState) 
        {
          this.props = navigationState
          this.loadData()
        }
      })
     }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loadData()
  }

  async loadData(){
    this.presentLoading()
    let filter:GenericFilterBody = {
      query: {
        categoryKeyword: this.props.newCategoryKeyword
      },
      sort: { title: 1 },
      populate: 'avatarImgFileRef',
      populate2: 'topImgFileRef',
    } as GenericFilterBody
    this.genericList = await this.dataService.findAllFilter(APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA, filter).toPromise()
    this.restoreItems()
    this.dismissLoading()
  }

  addNew(){
    let newProps:CategoryGenericProps = {...this.props, origin: 'NEW'}
    let navigationExtras: NavigationExtras = {
      state: newProps
    }
    this.router.navigate([ '/admin-management/add-category' ], navigationExtras);
  }

  editItem(catItem: CategorySchema){
    let newProps:CategoryGenericProps = {...this.props, origin: 'EDIT', editCategoryData: catItem, 
      localStorageRefName: this.props?.newCategoryKeyword ? this.props.newCategoryKeyword : 'EDIT'}
    let navigationExtras: NavigationExtras = {
      state: newProps
    }
    this.router.navigate([ '/admin-management/add-category' ], navigationExtras);
  }

  /****** SEARCH IN LIST ******/
  restoreItems(){
    this.findedItems = this.genericList
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.restoreItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
        this.isItemAvailable = true;
        this.findedItems = this.findedItems.filter((item) => {
            return (item['title'].toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
        this.isItemAvailable = false;
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class', message: 'Por favor espere...', duration: 5000, mode: 'ios'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async dismissLoading(){
    await this.loadingController.dismiss()
  }

  /**** DELETE CATEGORY */

  async deleteCategory(catItem: CategorySchema){
    await this.dataService.deleteOne(APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA, catItem._id).toPromise()
    this.loadData()
  }

  async presentAlertConfirm(catItem: CategorySchema) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: '¿Desea borrar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Confirmar',
          handler: () => {
            if(catItem._id && catItem._id != ''){
              this.deleteCategory(catItem)
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
