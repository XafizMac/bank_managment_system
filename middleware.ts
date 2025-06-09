import { NextRequest, NextResponse } from 'next/server';
import { useStore } from './store/store';

export function middleware(request: NextRequest) {
    const userId = request.cookies.get('userId')?.value;
    const userRole = request.cookies.get('userRole')?.value;

    const isAuthenticated = useStore.getState().isAuthenticated
    const validRoles = ['admin', 'employee', 'approver', 'archivist'];

    // 🔐 Если уже авторизован и заходит на /login — редиректим
    if (request.nextUrl.pathname === '/login' && (userId && userRole) && validRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/', request.url)); // или другая главная
    }

    // 🔐 Если не авторизован — редирект на логин
    if (!userId || !userRole) {
        // Разрешаем доступ к /login для неавторизованных
        if (request.nextUrl.pathname === '/login') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // ❌ Если роль невалидна — редирект на главную
    if (!validRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 🔐 Только admin может заходить на /admin
    if (request.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/admin/:path*',
        '/employee/:path*',
        '/approver/:path*',
        '/archivist/:path*',
        '/dashboard/:path*',
    ],
};
