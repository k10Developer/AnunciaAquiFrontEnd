import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from '../_models/veiculo';

@Injectable({
    providedIn: 'root'
})
export class VeiculoService {   
    
    // baseUrl = config.baseUrl;
    constructor(private http: HttpClient){}

    create(url: string , veiculo: Veiculo):Observable<any>{       
       return this.http.post(url, veiculo)       
    }
    update(url: string , veiculo: Veiculo):Observable<any>{            
        return this.http.put(url, veiculo)        
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