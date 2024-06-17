"use client";
import { CurrencyFormatter } from "../lib/utils";
import ExpenseCatgeoryItem from "../components/ExpenseCategoryItem";
import { useState, useRef, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from "../components/Modal";
import { FaRegTrashAlt } from "react-icons/fa";
ChartJS.register(ArcElement, Tooltip, Legend);

import { db } from "../lib/firebase/index.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
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
  const [income, setIncome] = useState([]);
  console.log(income);

  const [showIncomeModal, setIncomeModal] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createAt: new Date(),
    };
    console.log(newIncome);

    const collectionRef = collection(db, "income");

    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });
      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const getIncomeData = async () => {
      try {
        const collectionRef = collection(db, "income");
        const docsSnap = await getDocs(collectionRef);

        const data = docsSnap.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            createdAt: docData.createAt
              ? new Date(docData.createAt.toMillis())
              : null,
          };
        });

        setIncome(data);
      } catch (error) {
        console.error("Error fetching income data: ", error);
      }
    };

    getIncomeData();
  }, []);

  const deleteIncomeEntry = async (incomeID) => {
    const docRef = doc(db, "income", incomeID);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id != incomeID);
      });
    } catch {
      console.log(error.message);
    }
  };
  return (
    <>
      <Modal show={showIncomeModal} onClose={setIncomeModal}>
        <form onSubmit={addIncomeHandler} className="input-grp">
          <div className="input-grp">
            <label htmlFor="amount"> Income Amount</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Enter income amount"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="description">Description</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              name="description"
              ref={descriptionRef}
              type="text"
              placeholder="Enter income descrition"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Entry
          </button>
        </form>
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl font-bold">Income History</h3>
          {income.map((i) => {
            return (
              <div className="flex justify-between items-center" key={i.id}>
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">
                    {i.createdAt?.toISOString()}
                  </small>
                </div>
                <p className="flex items-center gap-2">
                  {CurrencyFormatter(i.amount)}
                  <button
                    onClick={() => {
                      deleteIncomeEntry(i.id);
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      </Modal>

      <main className="container mx-auto px-6 py-6 max-w-2xl">
        <section>
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{CurrencyFormatter(101)}</h2>
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
