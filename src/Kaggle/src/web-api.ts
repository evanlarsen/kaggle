import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

export interface Record {
  id: number;
  competitionName: string;
  teamName: string;
  userNames: string;
  score: string;
  scoreFirstSubmittedDate: string;
  numSubmissions: string;
}

export interface RecordWithRank extends Record {
  rank: number;
}

@autoinject
export class WebApi {
  isRequesting = false;

  constructor(private client: HttpClient) {
    client.configure(config => {
      config
        .withBaseUrl('api/')
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }
  
  getLeaderboards(): Promise<Record[]>{
    this.isRequesting = true;
    return new Promise(resolve => {
      this.client
        .fetch('records')
        .then(response => {
          response.json()
            .then(records => {
              resolve(records);
              this.isRequesting = false;
            });
        });
    });
  }

  getLeaderboard(id): Promise<RecordWithRank[]>{
    this.isRequesting = true;
    return new Promise(resolve => {
      this.client
        .fetch(`leaderboard/${id}`)
        .then(response => {
          response.json()
            .then(records => {
              resolve(records);
              this.isRequesting = false;
            });
        });
    });
  }

  getListOfLeaderboards(): Promise<string[]> {
    this.isRequesting = true;
    return new Promise(resolve => {
      this.client
        .fetch('leaderboards')
        .then(response => {
          response.json()
            .then(leaderboards => {
              resolve(leaderboards);
              this.isRequesting = false;
            });
        });
    });
  }

  saveRecord(record): Promise<Record>{
    this.isRequesting = true;
    return new Promise(resolve => {
      this.client
        .fetch('leaderboard', { method: 'POST', body: json(record) })
        .then(response => {
          response.json()
            .then(record => {
              resolve(record);
              this.isRequesting = false;
            });
        });
    });
  }
}
