import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../model/user.model";
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthConfig implements HttpInterceptor {
	constructor(private authService: AuthService) {
	}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const authToken = localStorage.getItem('token') || '';

		if (User.isLogin()) {
			const authReq = req.clone({
				setHeaders: {
					Authorization: `${authToken}`,
				},
			});

			// Tiếp tục xử lý yêu cầu với token đã thêm vào
			return next.handle(authReq);
		} else {
			return next.handle(req);
		}
	}
}
