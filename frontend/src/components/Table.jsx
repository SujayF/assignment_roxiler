import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";

function Table() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [searchText, setSearchText] = useState("");

  const filterData = (originalData, keyword) => {
    return originalData.filter((item) => {
      if (!item || typeof keyword !== "string") {
        // Handle the case where item is undefined/null or keyword is not a string
        return false;
      }

      return (
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.description.toLowerCase().includes(keyword.toLowerCase()) ||
        item.price.toString().includes(keyword)
      );
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/api/transactions/${selectedMonth}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        // Filter the data based on search text
        const filteredData = filterData(result, searchText);
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMonth, searchText]);

  // const handleSearchSubmit = async (e) => {
  //   e.preventDefault();

  //   setSearchText(e.target.value);

  //   try {
  //     const response = await fetch(`http://localhost:5100/api/transactions/${selectedMonth}`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const result = await response.json();

  //     // Filter the data based on search text
  //     const filteredData = filterData(result, setSearchText);
  //     console.log(filteredData);
  //     setData(filteredData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      if (searchText.trim() === "") {
        // If search text is empty, fetch all transactions for the selected month
        const response = await fetch(
          `http://localhost:5100/api/transactions/${selectedMonth}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } else {
        // If search text is not empty, fetch and filter transactions
        const response = await fetch(
          `http://localhost:5100/api/transactions/${selectedMonth}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        // Filter the data based on search text
        const filteredData = filterData(result, searchText);
        setData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ cell: { value } }) => value.toFixed(2),
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Sold",
        accessor: "sold",
        Cell: ({ cell: { value } }) => (value ? "Yes" : "No"),
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell: { value } }) => (
          <a href={value} target="_blank" rel="noopener noreferrer">
            View Image
          </a>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    state: { pageIndex },
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  return (
    <>
      <div className="tab">
        <div className="search-container flex">


          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>

          <select
            className="dropdown"
            value={selectedMonth}
            onKeyDown={(e) => e.preventDefault()}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="" disabled hidden>
              Select a Month
            </option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2023, i, 1).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>
       

       <div className="table-container">

       

        {data.length === 0 ? (
          <p>No results found...</p>
        ) : (
          <table className="dyamicTable" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        
        </div>


      </div>

      <div className="pagination flex">
        <div className="text">Page No. - {pageIndex + 1 || 1}</div>
        <div>
          <button
            onClick={() => pageIndex > 0 && gotoPage(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            Previous
          </button>
          <span>
            Page {pageIndex + 1} of {pageCount}
          </span>
          <button
            onClick={() => pageIndex < pageCount - 1 && gotoPage(pageIndex + 1)}
            disabled={pageIndex === pageCount - 1}
          >
            Next
          </button>
        </div>

        <div>
          <p>Per Page - 5</p>
        </div>
      </div>
    </>
  );
}

export default Table;
