"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import request from "@/request"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useStore } from "@/stores/userStore"

interface SignInProps {}

const signInFormSchema = z.object({
  username: z.string({ message: "请输入用户名" }),
  password: z.string({ message: "请输入密码" }),
})

const SignIn: FC<SignInProps> = () => {
  const setUser = useStore((state) => state.setUser)

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: undefined,
      password: undefined,
    },
  })

  const signIn = async (data: z.infer<typeof signInFormSchema>) => {
    setLoading(true)
    const { success } = await request.post("/api/account/login", data)
    setLoading(false)
    if (success) {
      toast.success("登录成功")
      // 刷新用户信息
      const { success, result } = await request.get("/api/user")
      if (success && result) {
        setUser(result)
      }
      // 跳转到首页
      router.push("/")
    }
  }

  return (
    <div>
      <div className="w-[480px] p-[12px] shadow mx-auto rounded mt-[200px] border">
        <Form {...signInForm}>
          <form onSubmit={signInForm.handleSubmit(signIn)} className="w-full space-y-6">
            <FormField
              control={signInForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="用户名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signInForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="密码" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button disabled={loading} type="submit">
                {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                登录
              </Button>
              <Link href="/sign/up" className="text-[12px]">
                没有账号？去注册
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
