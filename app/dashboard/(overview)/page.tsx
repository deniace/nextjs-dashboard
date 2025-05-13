import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoice from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";

import { fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

import { Suspense } from "react";
import {
    RevenueChartSkeleton,
    LatestInvoicesSkeleton,
} from "@/app/ui/skeletons";

export default async function Page() {
    const {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices,
    } = await fetchCardData();

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card
                    title="Collected"
                    value={totalPaidInvoices}
                    type="collected"
                />

                <Card
                    title="Pending"
                    value={totalPendingInvoices}
                    type="pending"
                />

                <Card
                    title="Total Invoices"
                    value={numberOfInvoices}
                    type="archive_box"
                />

                <Card
                    title="Total Customers"
                    value={numberOfCustomers}
                    type="beaker"
                />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* revenue chart */}
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>

                {/* latest invoice */}
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoice />
                </Suspense>
            </div>
        </main>
    );
}
