"use client";
import { CurrencyFormatter } from "../lib/utils";
import ExpenseCatgeoryItem from "../components/ExpenseCategoryItem";
import { useState, useRef, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AddIncomeModal from "../components/modals/AddIncomeModal";
ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY = [
  {
    id: 1,
    title: "Entertainment",
    color: "#000",
    total: 100,
  },
  {
    id: 2,
    title: "Fuel",
    color: "#000",
    total: 200,
  },
  {
    id: 3,
    title: "Movies",
    color: "#000",
    total: 420,
  },
  {
    id: 4,
    title: "Gas",
    color: "#000",
    total: 500,
  },
];

export default function Home() {
  const [showIncomeModal, setIncomeModal] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();
  return (
    <>
      <AddIncomeModal show={showIncomeModal} onClose={setIncomeModal} />
      <main className="container mx-auto px-6 py-6 max-w-2xl">
        <section>
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4sxl font-bold">{CurrencyFormatter(101)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button onClick={() => {}} className="btn btn-primary">
            +Expense
          </button>
          <button
            onClick={() => {
              setIncomeModal(true);
            }}
            className="btn btn-primary-outline"
          >
            +Income
          </button>
        </section>
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6 ">
            {DUMMY.map((expenses) => {
              return (
                <ExpenseCatgeoryItem
                  key={expenses.id}
                  color={expenses.color}
                  title={expenses.title}
                  total={expenses.total}
                />
              );
            })}
          </div>
        </section>
        <section className="py-6">
          <h3 className="text-2xl"> Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: DUMMY.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expense",
                    data: DUMMY.map((expense) => expense.total),
                    backgroundColor: DUMMY.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
