import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import {HttpClient, HttpHandler, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    HttpClient
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  public temp;
  private getWether = () => {
    const params = new HttpParams()
      .set('id', '2172797')
      .set('units', '%22metric%22 or %22imperial%22')
      .set('mode', 'xml%2C html')
      .set('q', 'London');
    this.http.get(
    'https://community-open-weather-map.p.rapidapi.com/weather',
    {
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': '6a1085436fmshf249966f01214cep149737jsnfb16b05ebc91',
        useQueryString: 'true'
      },
      params
    }).subscribe(temp => {
      console.log('temp', temp);
      this.temp = temp;
    });
  }

  constructor(private ref: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit() {
    this.getWether();
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
