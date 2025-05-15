"use server";

import { z } from "zod";
import postgres from "postgres";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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

    try {
        await sql`INSERT INTO invoices (customer_id, amount, status, date)
                    VALUES (${customerId}, ${amountInCent}, ${status}, ${date});
        `;
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
}

// using zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    console.log(`customer id = ${customerId}`);
    console.log(`amount = ${amount}`);
    console.log(`status = ${status}`);

    const amountInCent = amount * 100;
    try {
        await sql`
        update invoices
            set customer_id = ${customerId}, amount = ${amountInCent}, status = ${status}
        where id = ${id};
    `;
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
    throw new Error("tes error");

    try {
        await sql`Delete from invoices where id = ${id}`;
    } catch (error) {
        console.log(error);
    }
    revalidatePath("dashboard/invoices");
}
