import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import Swal from "sweetalert2";

const formSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters." }),
	email: z.string().email({ message: "Invalid email format." }),
	message: z
		.string()
		.min(10, { message: "Message must be at least 10 characters." }),
});

const ContactForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		const formspreeEndpoint = "https://formspree.io/f/mrbzgbdo"; // Endpoint Formspree yang sudah Anda berikan

		fetch(formspreeEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
				setIsLoading(false);
				Swal.fire({
					icon: "success",
					title: "Success",
					text: "Your message has been sent successfully!",
				});
				form.reset(); // Optional: reset form after successful submission
			})
			.catch((error) => {
				console.error("Error:", error);
				setIsLoading(false);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong! Please try again later.",
				});
			});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
				action="https://formspree.io/f/mrbzgbdo"
				method="POST"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<div className="FormItem">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										className="focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 border-gray-500"
										placeholder="Your name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</div>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<div className="FormItem">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										className="focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 border-gray-500"
										placeholder="Your email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</div>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<div className="FormItem">
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea
									className="focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 border-gray-500"
									placeholder="Your message"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</div>
					)}
				/>

				<Button
					type="submit"
					className="w-full"
					disabled={isLoading}
				>
					{isLoading ? "Sending..." : "Send Message"}
				</Button>
			</form>
		</Form>
	);
};

export default ContactForm;
