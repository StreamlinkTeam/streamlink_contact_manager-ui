import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';
import {Contract} from '../entities/contract.model';
import {PersonalInformation} from '../entities/personal-information.model';
import {SkillsInformation} from '../entities/skills-information.model';
import { WishedContract } from '../entities/wished-contract.model';
import {HttpHeaders} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
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
      .get<Contract>(url, options)
      .catch(this.handleError);

  }

  createContracts(contract: Contract, reference: string): Observable<Contract> {

    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this.http
      .post<Contract>(url, contract, options)
      .catch(this.handleError);
  }

  updateContract(contract: Contract, reference: string): Observable<Contract> {
    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<Contract>(url, contract, options)
      .catch(this.handleError);
  }

  deleteContract(reference: string): Observable<any> {
    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .delete<any>(url, options)
      .catch(this.handleError);
  }
  
  getWishedContract(reference: string): Observable<WishedContract> {

    const url = environment.API + '/ws/developers/contract/wished';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this
      .http
      .get<WishedContract>(url, options)
      .catch(this.handleError);

  }

  updateWishedContract(wishedContract: WishedContract, reference: string): Observable<WishedContract> {
    const url = environment.API + '/ws/developers/contract/wished';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<WishedContract>(url, wishedContract, options)
      .catch(this.handleError);
  }


  /**
* Handle server errors.
* @param error .
*/
  private handleError(error: HttpResponse<any> | any) {


    console.error(error);
    return Promise.reject(error);
  }

}

