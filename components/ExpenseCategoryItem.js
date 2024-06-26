import { CurrencyFormatter } from "../lib/utils";
export default function ExpenseCatgeoryItem({ color, title, total }) {
  return (
    <button>
      <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ backgroundColor: color }}
          />
          <div className="capitalize">{title} </div>
        </div>
        <p> {CurrencyFormatter(total)}</p>
      </div>
    </button>
  );
}
