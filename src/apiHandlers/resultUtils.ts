import { ApiData } from "@/request"
import { NextResponse } from "next/server"

export function success(result: any, init?: ResponseInit) {
  return Response.json({ success: true, result, message: null, code: null }, init)
}

export function failure(dataOrMessage: Omit<ApiData, 'success' | 'result'> | string | undefined, init?: ResponseInit) {
  const data = typeof dataOrMessage === 'string' || typeof dataOrMessage === 'undefined' ?
    {
      success: false,
      result: null,
      message: dataOrMessage ?? null,
      code: 500,
    } :
    {
      success: false,
      result: null,
      message: dataOrMessage.message ?? null,
      code: dataOrMessage.code ?? 500,
    }
  return Response.json(data, init)
}

export function nextSuccess(result: any, init?: ResponseInit) {
  return NextResponse.json({ success: true, result, message: null, code: null }, init)
}

export function nextFailure(dataOrMessage: Omit<ApiData, 'success' | 'result'> | string | undefined, init?: ResponseInit) {
  const data = typeof dataOrMessage === 'string' || typeof dataOrMessage === 'undefined' ?
    {
      success: false,
      result: null,
      message: dataOrMessage ?? null,
      code: 500,
    } :
    {
      success: false,
      result: null,
      message: dataOrMessage.message ?? null,
      code: dataOrMessage.code ?? 500,
    }
  return NextResponse.json(data, init)
}
