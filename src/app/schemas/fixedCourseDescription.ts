import { CategorySchema } from './category'
import { APPCONSTANTS } from '../constants/app-constants'

export class FixedCourseDescription {

    private template:CategorySchema = {
        _id: null,
        parentCategory :null,
        childCategories : [],
        categoryKeyword : null,
        avatarImg : null,
        avatarTitle : null,
        avatarSubtitle : null,
        topImg : null,
        title : null,
        subtitle : null
    }
    public fixedItemList:CategorySchema[]
    public materialEstudio:CategorySchema
    public paginasOficiales:CategorySchema
    public pensumDeEstudios:CategorySchema
    public areasDeTrabajo:CategorySchema
    public experienciasEgresados:CategorySchema
    public recursosUtiles:CategorySchema
    public consejosCarrera:CategorySchema

    constructor(templateCategoy: CategorySchema){
        this.template.parentCategory = templateCategoy._id
        this.materialEstudio = {
            ...this.template, 
            topImg : '../../assets/img/secciones_carrera/material.jpg',
            title: 'Material de estudio para ingreso',
            _id: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.MATERIAL_ESTUDIO
        }
        this.paginasOficiales = {
            ...this.template, 
            topImg : '../../assets/img/secciones_carrera/paginas.jpg',
            title: 'Paginas Oficiales',
            _id: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.PAGINAS_OFICIALES
        }
        this.pensumDeEstudios = {
            ...this.template, 
            topImg : '../../assets/img/secciones_carrera/pensum.jpg',
            title: 'Pénsum de Estudios',
            _id: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.PENSUM_ESTUDIOS
        }
        this.areasDeTrabajo = {
            ...this.template, 
            topImg : '../../assets/img/secciones_carrera/trabajo.jpg',
            title: 'Áreas de trabajo',
            _id: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.AREAS_TRABAJO
        }

        this.experienciasEgresados = {
            ...this.template, 
            topImg : '../../assets/img/secciones_carrera/experiencias.jpg',
            title: 'Experiencias de Egresados',
            _id: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.EXPERIENCIAS_EGRESADOS
        }

        this.recursosUtiles = {
            ...this.template, 
            topImg : '../../assets/img/secciones_carrera/recursos.jpg',
            title: 'Recursos Utiles',
            _id: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.RECURSOS_UTILES
        }

        this.consejosCarrera = {
            ...this.template, 
            topImg : '../../assets/img/secciones_carrera/consejos.jpg',
            title: 'Consejos sobre la carrera',
            _id: APPCONSTANTS.CATEGORIES.CAREER_SECTIONS.CONSEJOS
        }

        this.fixedItemList = [this.materialEstudio, this.paginasOficiales, this.pensumDeEstudios,
            this.areasDeTrabajo, this.experienciasEgresados, this.recursosUtiles,
            this.consejosCarrera
        ]
    }

    public getList():CategorySchema[]{
        return this.fixedItemList
    }
}