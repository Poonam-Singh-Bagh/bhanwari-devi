import React, { useState } from "react";
import "./styles.scss";
import { BsArrowUpDown } from "react-icons/bs";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";

function StudentClassData(props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [ascendingByClass, setAscendingByClass] = useState(true);
  const [ascendingByFacilitator, setAscendingByFacilitator] = useState(true);
  const [ascendingByClassRating, setAscendingByClassRating] = useState(true);
  const [ascendingByClassDate, setAscendingByClassDate] = useState(true);
  const [asceDescByNumber, setAsceDescByNumber] = useState(true);
  const [asceDescByAlphabet, setAsceDescByAlphabet] = useState(true);
  const [loading, setLoading] = useState(true);
  const [debouncedText] = useDebounce(searchTerm);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(props.location.state.pass.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
  };

  const totalClass = props.location.state.pass;
  const studentClassData = (item) => {
    return (
      <tr key={item.id}>
        <td data-column="Title">{item.title}</td>
        <td data-column="Class Id">{item.id}</td>
        <td data-column="Facilitator">{item.facilitator_name}</td>
        <td data-column="Language">{languageMap[item.lang]}</td>
        <td data-column="Date">{item.start_time}</td>
        <td data-column="Class Rating">
          {[1, 2, 3, 4, 5].map((star) => {
            return item.feedback.feedback > 0 &&
              star <= item.feedback.feedback ? (
              <span className="fa fa-star" style={{ color: "#D55F31" }}></span>
            ) : (
              <span className="fa fa-star" style={{ color: "gray" }}></span>
            );
          })}
        </td>
      </tr>
    );
  };

  const sortByClassName = () => {
    setAscendingByClass(!ascendingByClass);
    setLoading(true);
    setAsceDescByAlphabet(true);
  };

  const sortByClassFacilitator = () => {
    setAscendingByFacilitator(!ascendingByFacilitator);
    setLoading(true);
    setAsceDescByAlphabet(false);
  };

  const sortByClassRating = () => {
    setAscendingByClassRating(!ascendingByClassRating);
    setLoading(false);
    setAsceDescByNumber(true);
  };

  const sortByClassDate = () => {
    setAscendingByClassDate(!ascendingByClassDate);
    setLoading(false);
    setAsceDescByNumber(false);
  };

  return (
    <div className="container-for-table">
      <p className="studentName">
        {" "}
        Total Classes by {props.location.state.passName} :{" "}
        {props.location.state.pass.length}
      </p>
      <div className="container-for-search">
        <div>
          <input
            className="search-for-classes"
            type="text"
            placeholder="Search by Class Title "
            value={debouncedText}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <div className="last-item">
          <ReactPaginate
            previousLabel={<i className="fa fa-angle-left"></i>}
            nextLabel={<i className="fa fa-angle-right"></i>}
            initialPage={0}
            marginPagesDisplayed={0}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="paginationBttns"
            previousLinkClassName="previousBttn"
            nextLinkClassName="nextBttn"
            disabledClassName="paginationDisabled"
            activeClassName="paginationActive"
          />
        </div>
      </div>

      <table className="student-class-table">
        <thead>
          <tr>
            <th>
              Class Title
              <button
                type="button"
                onClick={sortByClassName}
                className="sortButtonClassTitle"
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th>Class Id</th>
            <th>
              Facilitator
              <button
                type="button"
                onClick={sortByClassFacilitator}
                className="sortFacilitator"
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th>Language</th>
            <th>
              Class Date
              <button
                type="button"
                onClick={sortByClassDate}
                className="sortButton"
              >
                <BsArrowUpDown />
              </button>
            </th>
            <th>
              Class Rating
              <button
                type="button"
                onClick={sortByClassRating}
                className="sortButton"
              >
                <BsArrowUpDown />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.location.state.pass && props.location.state.pass.length > 0 ? (
            // props.location.state.pass
            //   .filter((searchValue) => {
            //     if (searchTerm == "") {
            //       return searchValue;
            //     } else if (
            //       searchValue.title
            //         .toLowerCase()
            //         .includes(searchTerm.toLowerCase())
            //     ) {
            //       return searchValue;
            //     }
            //   })
            //   .slice(pagesVisited, pagesVisited + usersPerPage)
            //   .map((item) => {
            //     return (
            //       <tr key={item.id}>
            //         <td data-column="Title">{item.title}</td>
            //         <td data-column="Class Id">{item.id}</td>
            //         <td data-column="Facilitator">{item.facilitator_name}</td>
            //         <td data-column="Language">{languageMap[item.lang]}</td>
            //         <td data-column="Date">{item.start_time}</td>
            //         <td data-column="Class Rating">
            //           {[1, 2, 3, 4, 5].map((star) => {
            //             return item.feedback.feedback > 0 &&
            //               star <= item.feedback.feedback ? (
            //               <span
            //                 className="fa fa-star"
            //                 style={{ color: "#D55F31" }}
            //               ></span>
            //             ) : (
            //               <span
            //                 className="fa fa-star"
            //                 style={{ color: "gray" }}
            //               ></span>
            //             );
            //           })}
            //         </td>
            //       </tr>
            //     );
            //   })
            loading ? (
              asceDescByAlphabet ? (
                ascendingByClass ? (
                  totalClass
                    .slice(0)
                    .sort(function (a, b) {
                      const numberA = a.title.toLowerCase();
                      const numberB = b.title.toLowerCase();
                      return numberA < numberB ? -1 : numberA > numberB ? 1 : 0;
                    })
                    .map((item) => {
                      return studentClassData(item);
                    })
                ) : (
                  totalClass
                    .slice(0)
                    .sort(function (a, b) {
                      const numberA = a.title.toLowerCase();
                      const numberB = b.title.toLowerCase();
                      return numberA < numberB ? -1 : numberA > numberB ? 1 : 0;
                    })
                    .reverse()
                    .map((item) => {
                      return studentClassData(item);
                    })
                )
              ) : ascendingByFacilitator ? (
                totalClass
                  .slice(0)
                  .sort(function (a, b) {
                    const numberA = a.facilitator_name.toLowerCase();
                    const numberB = b.facilitator_name.toLowerCase();
                    return numberA < numberB ? -1 : numberA > numberB ? 1 : 0;
                  })
                  .map((item) => {
                    return studentClassData(item);
                  })
              ) : (
                totalClass
                  .slice(0)
                  .sort(function (a, b) {
                    const numberA = a.facilitator_name.toLowerCase();
                    const numberB = b.facilitator_name.toLowerCase();
                    return numberA < numberB ? -1 : numberA > numberB ? 1 : 0;
                  })
                  .reverse()
                  .map((item) => {
                    return studentClassData(item);
                  })
              )
            ) : asceDescByNumber ? (
              ascendingByClassRating ? (
                totalClass
                  .slice(0)
                  .sort(function (a, b) {
                    return a.feedback.feedback - b.feedback.feedback;
                  })
                  .map((item) => {
                    return studentClassData(item);
                  })
              ) : (
                totalClass
                  .slice(0)
                  .sort(function (a, b) {
                    return b.feedback.feedback - a.feedback.feedback;
                  })
                  .map((item) => {
                    return studentClassData(item);
                  })
              )
            ) : ascendingByClassDate ? (
              totalClass
                .slice(0)
                .sort(
                  (a, b) =>
                    Date.parse(
                      new Date(a.start_time.split("-").reverse().join("-"))
                    ) -
                    Date.parse(
                      new Date(b.start_time.split("-").reverse().join("-"))
                    )
                )
                .map((item) => {
                  return studentClassData(item);
                })
            ) : (
              totalClass
                .slice(0)
                .sort(
                  (a, b) =>
                    Date.parse(
                      new Date(a.start_time.split("-").reverse().join("-"))
                    ) -
                    Date.parse(
                      new Date(b.start_time.split("-").reverse().join("-"))
                    )
                )
                .reverse()
                .map((item) => {
                  return studentClassData(item);
                })
            )
          ) : (
            <div className="message ">
              <h3>There are no results to display...</h3>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentClassData;
