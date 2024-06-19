import { useRef, useEffect, useContext } from "react";
import { CurrencyFormatter } from "../../lib/utils";
import Modal from "../Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { financeContext } from "../../lib/store/finance-context";
export default function AddIncomeModal({ show, onClose }) {
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);
  const amountRef = useRef();
  const descriptionRef = useRef();

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createAt: new Date(),
    };
    try {
      await addIncomeItem(newIncome);

      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteIncomeEntry = async (incomeID) => {
    try {
      await removeIncomeItem(incomeID);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
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
                <small className="text-xs">{i.createdAt?.toISOString()}</small>
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
  );
}
