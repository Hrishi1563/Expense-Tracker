import { useState, useContext, useRef } from "react";
import Modal from "../Modal";
import { v4 as uuidv4 } from "uuid";
import { financeContext } from "../../lib/store/finance-context";
export default function AddExpenseModal({ show, onClose }) {
  const titleRef = useRef();
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setCategory] = useState(null);
  const { expenses, addExpenseItem } = useContext(financeContext);
  const addExpenseHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });
    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };
    try {
      await addExpenseItem(selectedCategory, newExpense);
      setExpenseAmount("");
      setCategory(null);
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4 ">
        <label className="text-xl">Enter an amount </label>
        <input
          className="px-4 py-2 bg-slate-600 rounded-xl mb-3"
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="capitalize"> Select Expense Category </h3>
        <button className="text-lime-400">+ New Category </button>
      </div>
      <div>
        <input type="text" placeholder="Enter Title" ref={titleRef} />
        <label> Pick color </label>
      </div>
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                onClick={() => {
                  setCategory(expense.id);
                }}
              >
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? "1px 1px 4px" : "none",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{ backgroundColor: expense.color }}
                    />

                    <h4 className="capitalize"> {expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button className="btn btn-primary" onClick={addExpenseHandler}>
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}
