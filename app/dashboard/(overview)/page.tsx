import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoice from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";

import { fetchLatestInvoices } from "@/app/lib/data";

import { Suspense } from "react";
import {
    RevenueChartSkeleton,
    LatestInvoicesSkeleton,
    CardsSkeleton,
} from "@/app/ui/skeletons";

import CardWraper from "@/app/ui/dashboard/cards";

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWraper />
                </Suspense>
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
