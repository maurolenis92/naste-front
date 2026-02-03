import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClientService } from './http/http-client.service';
import { Observable, tap } from 'rxjs';
import { UserDetail, UserState } from '../app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClientService);
  private userProfile: WritableSignal<UserState> = signal({ userProfile: null });

  public userData = computed(() => this.userProfile());

  public getUserProfile(): Observable<UserDetail> {
    return this.http.get<UserDetail>('user').pipe(
      tap(userProfile => {
        this.userProfile.set({
          userProfile,
          initialLetters: userProfile.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase(),
        });
      })
    );
  }
}
