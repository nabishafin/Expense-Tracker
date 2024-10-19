export const getDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${year}-${month}-${date}`;
};

export const formatDate = (date) => {
  let inputDate = new Date(date);

  // Month names array
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get day, month, and year
  let day = inputDate.getDate();
  let month = monthNames[inputDate.getMonth()];
  let year = inputDate.getFullYear();

  // Format the output
  let formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};

export const getTotalAmount = (items) => {
  return items?.reduce((a, b) => a + b.amount, 0);
};

export const incomeCategories = ["Salary", "Outsourcing", "Bond", "Dividend"];
export const expenseCategories = [
  "Education",
  "Food",
  "Health",
  "Bill",
  "Insurance",
  "Tax",
  "Transport",
  "Telephone",
];
