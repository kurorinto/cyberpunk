import { RedirectType, redirect } from "next/navigation"

export const dynamic = "force-dynamic" // defaults to auto
export async function GET(request: Request) {
  redirect("/", RedirectType.push)
  return Response.json({ data: 1 })
}
