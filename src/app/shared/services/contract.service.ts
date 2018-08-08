import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Contract} from '../entities/contract.model';
import { WishedContract } from '../entities/wished-contract.model';
import {HttpParams} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ContractService {

  constructor(private http: HttpClient) {}

  getContract(reference: string): Observable<Contract> {

    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this
      .http
      .get<Contract>(url, options);

  }

  createContracts(contract: Contract, reference: string): Observable<Contract> {

    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this.http
      .post<Contract>(url, contract, options);
  }

  updateContract(contract: Contract, reference: string): Observable<Contract> {
    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<Contract>(url, contract, options);
  }

  deleteContract(reference: string): Observable<any> {
    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .delete<any>(url, options);
  }
  
  getWishedContract(reference: string): Observable<WishedContract> {

    const url = environment.API + '/ws/developers/contract/wished';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this
      .http
      .get<WishedContract>(url, options);

  }

  updateWishedContract(wishedContract: WishedContract, reference: string): Observable<WishedContract> {
    const url = environment.API + '/ws/developers/contract/wished';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<WishedContract>(url, wishedContract, options);
  }
}

