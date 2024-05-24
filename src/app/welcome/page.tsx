"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import request from "@/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface WelcomeProps {}

const FormSchema = z.object({
  username: z.string({ message: '请输入用户名' }),
  password: z.string({ message: '请输入密码' }),
});

const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  const { success } = await request.post('/api/login', data);
  if (success) {
    toast.success('登录成功');
  }
};

const Welcome: FC<WelcomeProps> = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: undefined,
      password: undefined,
    },
  });

  return (
    <div>
      <div className="w-[480px] p-[12px] shadow mx-auto rounded mt-[200px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
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
              control={form.control}
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
            <Button type="submit">登录</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Welcome;
