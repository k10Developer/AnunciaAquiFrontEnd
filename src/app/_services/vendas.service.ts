import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Relatorio } from '../_models/relatorio';
import { Venda } from '../_models/venda';

@Injectable({
    providedIn: 'root'
})
export class VendaService {   
    
    // baseUrl = config.baseUrl;
    constructor(private http: HttpClient){}

    create(url: string , venda: Venda):Observable<any>{       
       return this.http.post(url, venda)       
    }
    update(url: string , venda: Venda):Observable<any>{            
        return this.http.put(url, venda)        
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
   getVendaPorData(url: string,relatorio: Relatorio){
    const newUrl = `${url}/${relatorio.dataInicial}/${relatorio.dataFim}`;
    return this.http.get<any>(newUrl);      
   }
}