import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, GenericFilterBody } from '../../../shared/services/data.service';
import { CategoryGenericProps } from '../interfaces/category-props.interface';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from '@ionic/angular';
import { CategorySchema } from '../../../schemas/category';
import { APPCONSTANTS } from '../../../constants/app-constants';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  props:CategoryGenericProps
  firebaseUploadFolderName:string = 'category'
  
  /** LOCAL DATA */
  categoryForm: FormGroup
  categoryData: CategorySchema = {} as CategorySchema
  parentCategoryList: CategorySchema[] = []
  universityCategoryList: CategorySchema[] = []
  publishing:boolean = false
  
  constructor(private route: ActivatedRoute, private navCtrl:NavController,
        private router: Router, public alertController: AlertController,
        private dataService: DataService, public fb: FormBuilder, private storage: Storage) {

      this.route.queryParams.subscribe(params => {
        let navigationState:CategoryGenericProps = this.router.getCurrentNavigation().extras.state as CategoryGenericProps
        if (navigationState) 
        {
          this.props = navigationState
          this.initFormData()
          this.getPropsAndFetchData()
        }
      })
  }

  ngOnInit() {
  }

  async initFormData(){
    if(this.props?.origin == 'NEW'){
        this.categoryData = await this.getLocalDraftFromStorage()
        console.log(this.categoryData);   
    }
  }

  saveFunction(data:any){
    //console.log('saving');
    this.savePostToLocalStorage(this.categoryData)
  }

  async onFormSubmit(form:any){
    if(this.props.avatarImg && !this.categoryData.avatarImgFileRef){
      this.presentAlert('Por favor suba una imagen de avatar!', 'No existe imagen de avatar!') 
      return
    }
    if(this.props.topImg && !this.categoryData.topImgFileRef){
      this.presentAlert('Por favor suba una imagen superior!', 'No existe imagen superior!') 
      return
    }
    if(form.invalid){
      this.presentAlert('Por favor verifique campos faltantes!', 'No se han llenado todos los campos!') 
      return
    }
    this.publishing = true

    // add links to topImage and avatarImg
    let avatarResult:any = null
    if(this.props?.avatarImg && this.categoryData?.avatarImgFileRef?.firestoreDownloadLink){
      this.categoryData.avatarImg = this.categoryData.avatarImgFileRef.firestoreDownloadLink
      avatarResult = await this.dataService.saveOne(APPCONSTANTS.SCHEMAS.FILES_SCHEMA, this.categoryData.avatarImgFileRef).toPromise()
          .catch(err=>{this.publishing = false })
      if(!avatarResult?._id){
        this.publishing = false
        this.presentAlert('ERROR!', 'Por favor intente de nuevo') 
        return
      }
    }

    let topImgResult:any = null
    if(this.props?.topImg && this.categoryData?.topImgFileRef?.firestoreDownloadLink){
      this.categoryData.topImg = this.categoryData.topImgFileRef.firestoreDownloadLink
      topImgResult = await this.dataService.saveOne(APPCONSTANTS.SCHEMAS.FILES_SCHEMA, this.categoryData.topImgFileRef).toPromise()
          .catch(err=>{this.publishing = false })
      if(!topImgResult?._id){
        this.publishing = false
        this.presentAlert('ERROR!', 'Por favor intente de nuevo') 
        return
      }
    }
    // Add category
    let serverData = {
      ...this.categoryData,
      categoryKeyword: this.props.newCategoryKeyword,
      avatarImgFileRef: avatarResult?._id,
      topImgFileRef: topImgResult?._id
    } as CategorySchema

    //console.log(serverData);
    let result = await this.dataService.saveOne(APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA, serverData).toPromise()
      .catch(err=>{
        this.publishing = false    
      })
    //console.log(result);
    
    this.publishing = false

    if (result._id) {
      await this.savePostToLocalStorage({} as CategorySchema)
      this.presentAlert('Éxito!', 'Los datos han sido guardados!') 
      this.goback()
    }
  }
  /**** SELECT OPTION */

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1 === o2 : o1 === o2;
  }

  compareWith = this.compareWithFn
  
  /**** FETCH DATA FROM SERVER  ***/

  async getPropsAndFetchData(){
    // Fetch parent category
    if(this.props?.parentCategory && this.props?.fetchParentCategoryFilterKeyWord){
      this.parentCategoryList = await this.fetchCategories(this.props.fetchParentCategoryFilterKeyWord)
    }
    // Fetch university
    this.universityCategoryList = await this.fetchCategories(APPCONSTANTS.CATEGORIES.UNIVERSITIES)
    
  }

  async fetchCategories(categoryKeyword){
    let reqCareersBody: GenericFilterBody = {} as GenericFilterBody
    reqCareersBody.query = { categoryKeyword: categoryKeyword }
    reqCareersBody.projection = { topImg: 0, avatarImg: 0, avatarImgFileRef: 0,  topImgFileRef: 0 }
    return await this.dataService.findAllFilter(APPCONSTANTS.SCHEMAS.CATEGORIES_SCHEMA, reqCareersBody).toPromise()
  }

  /***** LOCAL STORAGE */

  async getLocalDraftFromStorage(){
    let data = await this.storage.get(this.getLocalStorageRefName())
    !data ? data = {} as CategorySchema : null
    return data
  }

  async savePostToLocalStorage(dataToSaveOnLocal:CategorySchema){
    let result = await this.storage.set(this.getLocalStorageRefName(), dataToSaveOnLocal)
    !result &&
      this.presentAlert('Ha habido un error de guardado!', 'Intente de nuevo!') 
  }

  getLocalStorageRefName(){
    return (this.props?.localStorageRefName && this.props?.localStorageRefName != '') 
    ? this.props?.localStorageRefName : 'category-post'
  }

  /****** MISC *******/

  async presentAlert(subHeader:string, message:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goback() {
    this.navCtrl.pop();
    console.log('Click on button Test Console Log');
  }
}
