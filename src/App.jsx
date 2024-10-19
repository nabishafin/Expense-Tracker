import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SubmissionForm from "./components/SubmissionForm/SubmissionForm";
import BalanceStatistics from "./components/BalaceStatistics/BalanceStatistics";
import IncomeContainer from "./components/IncomeContainer/IncomeContainer";
import ExpenseContainer from "./components/ExpenseContainer/ExpenseContainer";
import { expenseCategories, getDate, getTotalAmount, incomeCategories } from "../utils";

function App() {
  const [isIncome, setIsIncome] = useState(false);
  const categoryList = isIncome ? incomeCategories : expenseCategories;

  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const [formData, setFormData] = useState({
    category: categoryList[0],
    amount: 0,
    date: getDate(),
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [clickedId, setClickedId] = useState();

  const handleSave = () => {
    //item for incomeList/expenseList
    const entries = {
      category: categoryList.includes(formData.category)
        ? formData.category
        : categoryList[0],
      amount: parseInt(formData.amount),
      date: formData.date,
    };
    if (entries?.amount > 0) {
      //valid amount
      if (isEditMode && typeof clickedId == "number") {
        //form is in edit mode
        if (isIncome) {
          const editedList = incomeList.map((item) => {
            if (item.id == clickedId) {
              return { ...item, ...entries };
            } else {
              return item;
            }
          });
          setIncomeList(editedList);
        } else {
          const editedList = expenseList.map((item) => {
            if (item.id == clickedId) {
              return { ...item, ...entries };
            } else {
              return item;
            }
          });
          setExpenseList(editedList);
        }
        setIsEditMode(false);
        setClickedId(undefined);
      } else {
        //form is in normal mode
        if (isIncome) {
          const id =
            incomeList?.length > 0
              ? incomeList[incomeList.length - 1]?.id + 1
              : 0;
          setIncomeList((prev) => [...prev, { id, ...entries }]);
        } else {
          const id =
            expenseList?.length > 0
              ? expenseList[expenseList.length - 1]?.id + 1
              : 0;
          setExpenseList((prev) => [...prev, { id, ...entries }]);
        }
      }
      resetFormData();
    } else {
      //invalid amount
      alert("Please enter a valid amount");
    }
  };

  const handleSort = (type, order) => {
    if (type == "income") {
      if (order == "asc") {
        const sortedList = [...incomeList].sort((a, b) => a?.amount - b?.amount);
        setIncomeList(sortedList);
      } else {
        const sortedList = [...incomeList].sort((a, b) => b?.amount - a?.amount);
        setIncomeList(sortedList);
      }
    } else {
      if (order == "asc") {
        setExpenseList((prev) => prev?.sort((a, b) => a?.amount - b?.amount));
      } else {
        setExpenseList((prev) => prev?.sort((a, b) => b?.amount - a?.amount));
      }
    }
  };

  const handleDelete = (type, id) => {
    let confirmDelete = confirm("Do you really want to delete this item?");
    if (confirmDelete) {
      if (type === "income") {
        setIncomeList((prev) => prev.filter((item) => item.id != id));
      } else {
        setExpenseList((prev) => prev.filter((item) => item.id != id));
      }
    }
  };

  const handleEdit = (type, id) => {
    setIsEditMode(true);
    let clickedItem;
    if (type == "income") {
      setIsIncome(true);
      clickedItem = incomeList.find((item) => item.id == id);
    } else {
      setIsIncome(false);
      clickedItem = expenseList.find((item) => item.id == id);
    }

    const { id: clickedId, category, amount, date } = clickedItem;
    setFormData({
      category,
      amount,
      date,
    });
    setClickedId(clickedId);
  };

  //reset form 
  const resetFormData = () => {
    setFormData({
      category: categoryList[0],
      amount: 0,
      date: getDate(),
    });
  };

  //calculate total Income and total expense
  const netIncome = getTotalAmount(incomeList)
  const netExpense = getTotalAmount(expenseList)

  return (
    <>
      <Navbar />
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SubmissionForm
            isIncome={isIncome}
            setIsIncome={setIsIncome}
            onSave={handleSave}
            categoryList={categoryList}
            formData={formData}
            setFormData={setFormData}
          />
          <div className="lg:col-span-2">
            <BalanceStatistics netExpense={netExpense} netIncome={netIncome} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <IncomeContainer
                incomeList={incomeList}
                handleSort={handleSort}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
              <ExpenseContainer
                expenseList={expenseList}
                handleSort={handleSort}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
