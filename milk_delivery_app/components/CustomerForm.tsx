import { useEffect, useState } from 'react';

type CustomerInput = {
  name: string;
  milk: string;
  quantity: number;
  price_per_liter: number;
};

type CustomerFormProps = {
  customer: CustomerInput | null;
  onSubmit: (customer: CustomerInput) => Promise<void>;
  onClose: () => void;
};

export default function CustomerForm({
  customer,
  onSubmit,
  onClose,
}: CustomerFormProps) {
  const [form, setForm] = useState<CustomerInput>({
    name: '',
    milk: 'Cow Milk',
    quantity: 1,
    price_per_liter: 60,
  });

  useEffect(() => {
    if (customer) {
      setForm(customer);
    }
  }, [customer]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(form);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-slate-950/40 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            {customer ? 'Edit Customer' : 'Add Customer'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Customer Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Milk Type
          </label>
          <select
            value={form.milk}
            onChange={(event) =>
              setForm((current) => ({ ...current, milk: event.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
          >
            <option value="Cow Milk">Cow Milk</option>
            <option value="Buffalo Milk">Buffalo Milk</option>
            <option value="Toned Milk">Toned Milk</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Quantity (Liters)
            </label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={form.quantity}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  quantity: Number(event.target.value),
                }))
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Price Per Liter
            </label>
            <input
              type="number"
              min="1"
              step="0.01"
              value={form.price_per_liter}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  price_per_liter: Number(event.target.value),
                }))
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
          >
            {customer ? 'Save Changes' : 'Add Customer'}
          </button>
        </div>
      </form>
    </div>
  );
}
