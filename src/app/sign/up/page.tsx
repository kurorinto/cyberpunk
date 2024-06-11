"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import request from "@/request"
import { useStore } from "@/stores/userStore"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface SignUpProps {}

const signUpFormSchema = z
  .object({
    username: z.string({ message: "请输入用户名" }).max(16, "不超过16个字符").min(4, "不少于4个字符"),
    password: z.string({ message: "请输入密码" }).max(16, "不超过16个字符").min(4, "不少于4个字符"),
    confirmPassword: z.string({ message: "请确认密码" }).max(16, "不超过16个字符").min(4, "不少于4个字符"),
    nick: z.string({ message: "请输入昵称" }).trim().min(1, "请输入昵称"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({ path: ["confirmPassword"], code: z.ZodIssueCode.custom, message: "密码不一致" })
    }
  })

const SignUp: FC<SignUpProps> = () => {
  const setUser = useStore((state) => state.setUser)
  const router = useRouter()

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
  })

  const signUp = async ({ username, password, nick }: z.infer<typeof signUpFormSchema>) => {
    const { success } = await request.post("/api/account/register", { username, password, nick })
    if (success) {
      toast.success("注册成功")
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
        <Form {...signUpForm}>
          <form onSubmit={signUpForm.handleSubmit(signUp)} className="w-full space-y-6">
            <FormField
              control={signUpForm.control}
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
              control={signUpForm.control}
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
            <FormField
              control={signUpForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="确认密码" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name="nick"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="昵称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button type="submit">注册</Button>
              <Link href="/sign/in" className="text-[12px]">
                已有账号？去登录
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
