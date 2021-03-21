import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 
  constructor(private _HttpClient:HttpClient) {}
  getPage(term,num):Observable<any>
  {
    let page = 
    this._HttpClient.get(`https://api.themoviedb.org/3/movie/${term}?api_key=c81c1b2c557bd90ec43cb538843151ee&page=${num}  `)

    return page;
  }

  getMovie( term):Observable<any>
  {
  
    let res = this._HttpClient.get(`https://api.themoviedb.org/3/movie/${term}?api_key=c81c1b2c557bd90ec43cb538843151ee  `)

    return res;
  }
  // https://api.themoviedb.org/3/search/movie/?api_key=abce214b5176c772f070df17029ee8c2&query=${getByWord.value}
  getByWord(word):Observable <any>
  {
    let ser = this._HttpClient.get(`https://api.themoviedb.org/3/search/movie/?api_key=c81c1b2c557bd90ec43cb538843151ee&query=${word}`)
    return ser;
  }

  getTrending():Observable<any>
  {

    let ter = this._HttpClient.get(`https://api.themoviedb.org/3/trending/all/day?api_key=c81c1b2c557bd90ec43cb538843151ee `)
    return ter;
  }
  
}




// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>