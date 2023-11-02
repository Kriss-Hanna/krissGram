import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { signupValidationSchema } from "@/lib/validation";
import z from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isLoading: isSigningIn } =
    useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupValidationSchema>>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof signupValidationSchema>) => {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Something went wrong.",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: "Sign In Failded, please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign up failded, please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col ">
        <img src="./assets/images/logo.svg" alt="" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram, please enter you account details
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5  mt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="shad-button_primary">
          {isCreatingAccount ? (
            <div className="flex-center gap-2 items-center">
              <Loader /> Loading ...
            </div>
          ) : (
            <div>Sign Up</div>
          )}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account ?{" "}
          <Link
            to="/sign-in"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Log in
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
