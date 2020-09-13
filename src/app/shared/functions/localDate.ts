import * as moment from 'moment';
moment.locale('es');

export function substractTimeZone(dateString: string) {
    if(dateString === null || dateString === "" || dateString === undefined){
        return ""
    }
    return moment(dateString).format('lll').toString()
}