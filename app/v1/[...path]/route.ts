import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  const url = new URL(request.url);
  const targetUrl = new URL('https://api.openai.com/v1/' + params.path.join('/'));

  // 复制请求头
  const headers = new Headers(request.headers);
  headers.set('Host', 'api.openai.com');

  // 发起请求到 OpenAI API
  const response = await fetch(targetUrl.toString(), {
    method: 'GET',
    headers: headers,
    redirect: 'manual',
  });

  // 处理流式返回
  const stream = response.body;
  return new NextResponse(stream, {
    headers: response.headers,
    status: response.status,
  });
}

export async function POST(request: Request, { params }: { params: { path: string[] } }) {
  const url = new URL(request.url);
  const targetUrl = new URL('https://api.openai.com/v1/' + params.path.join('/'));

  // 复制请求头
  const headers = new Headers(request.headers);
  headers.set('Host', 'api.openai.com');

  // 获取请求体
  const body = await request.arrayBuffer();

  // 发起请求到 OpenAI API
  const response = await fetch(targetUrl.toString(), {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'manual',
  });

  // 处理流式返回
  const stream = response.body;
  return new NextResponse(stream, {
    headers: response.headers,
    status: response.status,
  });
}

// 支持其他 HTTP 方法
export async function PUT(request: Request, { params }: { params: { path: string[] } }) {
  return handleRequest(request, 'PUT', params.path);
}

export async function DELETE(request: Request, { params }: { params: { path: string[] } }) {
  return handleRequest(request, 'DELETE', params.path);
}

export async function PATCH(request: Request, { params }: { params: { path: string[] } }) {
  return handleRequest(request, 'PATCH', params.path);
}

export async function OPTIONS(request: Request, { params }: { params: { path: string[] } }) {
  return handleRequest(request, 'OPTIONS', params.path);
}

async function handleRequest(request: Request, method: string, path: string[]) {
  const url = new URL(request.url);
  const targetUrl = new URL('https://api.openai.com/v1/' + path.join('/'));

  // 复制请求头
  const headers = new Headers(request.headers);
  headers.set('Host', 'api.openai.com');

  // 获取请求体
  const body = method !== 'OPTIONS' ? await request.arrayBuffer() : null;

  // 发起请求到 OpenAI API
  const response = await fetch(targetUrl.toString(), {
    method: method,
    headers: headers,
    body: body,
    redirect: 'manual',
  });

  // 处理流式返回
  const stream = response.body;
  return new NextResponse(stream, {
    headers: response.headers,
    status: response.status,
  });
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
