"use client";
import { CurrencyFormatter } from "../lib/utils";
import AddExpenseModal from "../components/modals/AddExpenseModal";
import { useState, useRef, useContext, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AddIncomeModal from "../components/modals/AddIncomeModal";
ChartJS.register(ArcElement, Tooltip, Legend);
import ExpenseCatgeoryItem from "../components/ExpenseCategoryItem";
import { financeContext } from "../lib/store/finance-context";

export default function Home() {
  const [showIncomeModal, setIncomeModal] = useState(false);
  const [showExpenseModal, setExpenseModal] = useState(false);
  const [Balance, setBalance] = useState(0);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { expenses, income } = useContext(financeContext);
  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);

    setBalance(newBalance);
  }, [expenses, income]);
  return (
    <>
      <AddIncomeModal show={showIncomeModal} onClose={setIncomeModal} />

      <AddExpenseModal show={showExpenseModal} onClose={setExpenseModal} />
      <main className="container mx-auto px-6 py-6 max-w-2xl">
        <section>
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4sxl font-bold">{CurrencyFormatter(Balance)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setExpenseModal(true);
            }}
            className="btn btn-primary"
          >
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
            {expenses.map((expenses) => {
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
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expense",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
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
