import { NextResponse } from 'next/server';

export async function middleware(request: Request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith('/v1/')) {
    const targetUrl = new URL('https://api.openai.com' + url.pathname);
    targetUrl.search = url.search;

    // 复制请求头
    const headers = new Headers(request.headers);
    headers.set('Host', 'api.openai.com');

    // 发起请求到 OpenAI API
    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : null,
      redirect: 'manual',
    });

    // 处理流式返回
    const stream = response.body;
    return new NextResponse(stream, {
      headers: response.headers,
      status: response.status,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/v1/:path*',
};
