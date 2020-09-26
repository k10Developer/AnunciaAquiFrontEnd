import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../_models/anuncio';

@Injectable({
    providedIn: 'root'
})
export class AnuncioService {   
    
    // baseUrl = config.baseUrl;
    constructor(private http: HttpClient){}

    create(url: string , anuncio: Anuncio):Observable<any>{       
       return this.http.post(url, anuncio)       
    }
    update(url: string , anuncio: Anuncio):Observable<any>{            
        return this.http.put(url, anuncio)        
    }
    delete(url: string, id: string):Observable<any>{
        const newUrl = `${url}/${id}`;    
        return this.http.delete(newUrl);        
    }
    getById(url: string,id:string): Observable<any> {           
        const newUrl = `${url}/${id}`;          
        return this.http.get<any>(newUrl);       
    }
    getTodos(url: string): Observable<any> {                     
       return this.http.get<any>(url)        
   }
}