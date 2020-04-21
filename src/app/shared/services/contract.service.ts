import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Contract} from '../entities/contract.model';
import {WishedContract} from '../entities/wished-contract.model';
import {HttpClient, HttpParams} from '@angular/common/http';

import {LoaderService} from './loader.service';


@Injectable()
export class ContractService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getContract(reference: string, isResource: boolean): Observable<Contract> {

    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/contract';
    } else {
      url = environment.API + '/ws/developers/contract';
    }

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this
      .http
      .get<Contract>(url, options);

  }

  createContracts(contract: Contract, reference: string, isResource: boolean): Observable<Contract> {

    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/contract';
    } else {
      url = environment.API + '/ws/developers/contract';
    }

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this.http
      .post<Contract>(url, contract, options);
  }

  updateContract(contract: Contract, reference: string, isResource: boolean): Observable<Contract> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/contract';
    } else {
      url = environment.API + '/ws/developers/contract';
    }

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<Contract>(url, contract, options);
  }

  deleteContract(reference: string, isResource: boolean): Observable<any> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/contract';
    } else {
      url = environment.API + '/ws/developers/contract';
    }

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .delete<any>(url, options);
  }

  getWishedContract(reference: string, isResource: boolean): Observable<WishedContract> {

    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/contract/wished';
    } else {
      url = environment.API + '/ws/developers/contract/wished';
    }

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this
      .http
      .get<WishedContract>(url, options);

  }

  updateWishedContract(wishedContract: WishedContract, reference: string, isResource: boolean): Observable<WishedContract> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/contract/wished';
    } else {
      url = environment.API + '/ws/developers/contract/wished';
    }

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<WishedContract>(url, wishedContract, options);
  }
}

