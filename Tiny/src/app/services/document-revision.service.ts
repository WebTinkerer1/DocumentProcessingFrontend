import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chapter } from '../model/response-model';


@Injectable({
  providedIn: 'root'
})
export class DocumentRevisionService {

  private serverUrl: string = 'http://localhost:5080/';

  constructor(private httpClient: HttpClient) { }

  public uploadDocument(formData: FormData, title: string, revision: number, splittingOption: any): Observable<any> {
    return this.httpClient.post(this.serverUrl + `api/DocumentProcessing/upload/${title}/${revision}/${splittingOption}`, formData);
  }

  public getChaptersForRevision(title: string, revision: number, chaptersToRevise: string): Observable<any> {
    return this.httpClient.get(this.serverUrl + `api/DocumentProcessing/revise/${title}/${revision}/${chaptersToRevise}`);
  }

  public updateChapters(chapters: Chapter[]): Observable<any> {
    return this.httpClient.post(this.serverUrl + `api/DocumentProcessing/updateChapters`, chapters);
  }
}
