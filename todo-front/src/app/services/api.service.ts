import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);
  private API_URL = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('act');
    this.jwtToken$.next(this.token);

    if (fetchedToken) {
      this.token = atob(fetchedToken);
    }
  }

  get JwtUserToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  getAllTodos() {
    return this.http.get(`${this.API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  login(username: string, password: string) {
    return this.http
      .post(`${this.API_URL}/auth/login`, { username, password })
      .subscribe(
        (res: any) => {
          this.token = res.token;
          if (this.token) {
            this.toast
              .success('Login Succesfully', '', {
                timeOut: 700,
                positionClass: 'toast-top-center',
              })
              .onHidden.toPromise()
              .then(() => {
                this.jwtToken$.next(this.token);
                localStorage.setItem('act', btoa(this.token));
                this.router.navigateByUrl('/').then();
              });
          }
        },
        (err: HttpErrorResponse) => {
          this.toast.error('Authentication Failed,Try Again', '', {
            timeOut: 1000,
          });
        }
      );
  }

  logout() {
    this.token = '';
    this.jwtToken$.next(this.token);
    this.toast
      .success('logout successfully', ' ', {
        timeOut: 500,
      })
      .onHidden.subscribe(() => {
        localStorage.removeItem('act');
        this.router.navigateByUrl('/login').then();
      });
    return '';
  }
  createTodo(title: string, description: string) {
    return this.http.post(
      `${this.API_URL}/todos`,
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  updateStatus(statusValue: string, todoId: number) {
    return this.http
      .patch(
        `${this.API_URL}/todos/${todoId}`,
        { status: statusValue },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .pipe(
        tap((res) => {
          if (res) {
            this.toast.success('todo is successfully updated', ' ', {
              timeOut: 1000,
            });
          }
        })
      );
  }

  deleteTodo(todoId: number) {
    return this.http
      .delete(`${this.API_URL}/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        tap((res) => {
          if (res) {
            this.toast.success('todo is successfully deleted', ' ', {
              timeOut: 1000,
            });
          }
        })
      );
  }

  register(username: string, password: string) {
    return this.http
      .post(`${this.API_URL}/auth/register`, { username, password })
      .pipe(
        //@ts-ignore
        catchError((err: HttpErrorResponse) => {
          this.toast.error(err.message, '', {
            timeOut: 1000,
          });
        })
      );
  }
}
