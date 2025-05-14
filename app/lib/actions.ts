"use server";

import { z } from "zod";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(["pending", "paid"]),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const rawFormData = {
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    };

    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    const amountInCent = amount * 100;
    const date = new Date().toISOString().split("T")[0];

    // test it aout
    console.log(rawFormData);
    console.log(typeof rawFormData.amount);
    console.log("type");
    console.log(`customerId = ${customerId}`);
    console.log(`status = ${status}`);
    console.log(`amount = ${amount} . type = ${typeof amount}`);
    console.log(
        `amount in cent = ${amountInCent} . type = ${typeof amountInCent}`
    );
    console.log(`date = ${date}`);
}
