type Customer = {
  id: number;
  name: string;
  milk: string;
  quantity: number;
  price_per_liter: number;
  total: number;
};

type RevenueChartProps = {
  customers?: Customer[];
};

export default function RevenueChart({ customers = [] }: RevenueChartProps) {
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.total, 0);
  const maxRevenue = Math.max(...customers.map((customer) => customer.total), 1);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-md border border-slate-100">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Revenue Overview</h3>
          <p className="text-sm text-slate-500">
            Total revenue: Rs. {totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {customers.length === 0 ? (
          <p className="text-slate-500">No customer revenue available yet.</p>
        ) : (
          customers.map((customer) => (
            <div key={customer.id}>
              <div className="mb-1 flex justify-between text-sm text-slate-600">
                <span>{customer.name}</span>
                <span>Rs. {customer.total.toFixed(2)}</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{ width: `${(customer.total / maxRevenue) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
