import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

import ButtonLoading from "./ButtonLoading";
import { zSchema } from "../../lib/zodSchema";

const OtpVerification = ({ email, onSubmit, loading }) => {
  const formSchema = zSchema.pick({ otp: true, email: true });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const handleOtpVerification = (values) => {
    onSubmit(values);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOtpVerification)}
          className="space-y-4"
        >
          <div className="text-center">
            <p>
              Please complete the verification process by entering the OTP sent
              to your email address.
            </p>
          </div>

          {/* OTP Field */}
          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}        // FIXED
                      onChange={field.onChange}  // FIXED
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>

                      <InputOTPSeparator />

                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Verify Button */}
          <ButtonLoading
            type="submit"
            text="Verify"
            loading={loading}
            className="w-full cursor-pointer"
          />

          {/* Resend OTP */}
          <div className="text-center mt-5">
            <button
              type="button"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OtpVerification;
