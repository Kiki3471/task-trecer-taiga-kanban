import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ApiService{
    private readonly url = 'http://localhost:3000/'
    private readonly http = inject(HttpClient);

    public get<T>(endOfUrl: string){        
        return this.http.get<T>(this.url + endOfUrl)
    }
}