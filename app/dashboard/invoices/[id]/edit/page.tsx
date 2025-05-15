import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { UpdateInvoices } from "@/app/lib/actions";

export default async function EditInvoicePage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const id = params.id;

    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);

    // console.log(invoice);
    console.log(customers);

    // console.log(params);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Invoices", href: "/dashboard/invoices" },
                    {
                        label: "Edit Invoices",
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />

            <Form invoice={invoice} customers={customers} />
        </main>
    );
}
