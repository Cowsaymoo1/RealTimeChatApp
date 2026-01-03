import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const signUpSchema = z.object({
  firstname: z.string().min(1, "First Name is required!"),
  lastname: z.string().min(1, "Last Name is required!"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  // register theo doi gia tri input
  // handleSubmit de submit form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const { firstname, lastname, username, email, password } = data;

    await signUp(username, password, email, firstname, lastname);
    navigate("/signin");

    //call api back-end.
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* header */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  <img src="logo.svg" alt="logo" />
                </a>
                <h1 className="text-2xl font-bold">Create Account</h1>
                <p className="text-muted-foreground text-balance">
                  Welcome! Create Account to get start
                </p>
              </div>
              {/* fullname */}
              <div className="grid grid-cols-2 gap-3">
                <div className="sapce-y-2">
                  <Label htmlFor="lastname" className="block text-sm">
                    Last Name
                  </Label>
                  <Input type="text" id="lastname" {...register("lastname")} />
                  {/* error message */}
                  {errors.lastname && (
                    <p className="text-destructive text-sm">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
                <div className="sapce-y-2">
                  <Label htmlFor="firstname" className="block text-sm">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    {...register("firstname")}
                  />
                  {/* error message */}
                  {errors.firstname && (
                    <p className="text-destructive text-sm">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
              </div>
              {/* username */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">
                  User Name
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="cowsaymoo1"
                  {...register("username")}
                />
                {/* error message */}
                {errors.username && (
                  <p className="text-destructive text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              {/* email */}
              <div className="sapce-y-2">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="cowsaymoo1@gmail.com"
                  {...register("email")}
                />
                {/* error message */}
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* password */}
              <div className="sapce-y-2">
                <Label htmlFor="password" className="block text-sm">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                />
                {/* error message */}
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* signup submit */}
              <Button type="submit" className="w-full " disabled={isSubmitting}>
                Create Account
              </Button>

              <div className="text-center text-sm">
                Already have Account?
                <a href="/signin" className="underline underline-offset-4">
                  {" "}
                  Sign In
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
