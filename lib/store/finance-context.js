"use client";
import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const financeContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const addIncomeItem = async (newIncome) => {
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
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const removeIncomeItem = async (incomeID) => {
    const docRef = doc(db, "income", incomeID);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id != incomeID);
      });
    } catch {
      console.log(error.message);
      throw error;
    }
  };

  const values = { income, expenses, addIncomeItem, removeIncomeItem };

  useEffect(() => {
    const getIncomeData = async () => {
      try {
        const collectionRef = collection(db, "income");
        const docsSnap = await getDocs(collectionRef);
        console.log(docsSnap.docs);
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

    const getExpenses = async () => {
      try {
        const collectionRef = collection(db, "expense");
        const docSnap = await getDocs(collectionRef);
        const data = docSnap.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setExpenses(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getIncomeData();
    getExpenses();
  }, []);

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
