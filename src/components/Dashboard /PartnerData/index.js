import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./styles.scss";
import { METHODS } from "../../../services/api";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { PATHS } from "../../../constant";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsArrowUpDown } from "react-icons/bs";

toast.configure();

function PartnerDashboard() {
  const [pageNumber, setPageNumber] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ascendingPartnersNames, setAscendingPartnersNames] = useState(true);
  const [ascendingPartnerStudentsNumber, setAscendingPartnerStudentsNumber] =
    useState(true);
  const [ascendingAlphabetically, setAsscendingAlphabetically] = useState(true);
  const [debouncedText] = useDebounce(searchTerm, 400);
  const user = useSelector(({ User }) => User);
  const limit = 10;

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners?${
        searchTerm.length > 0
          ? `name=${searchTerm}`
          : `limit=${limit}&page=${pageNumber + 1}`
      }`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setPartners(res.data.partners);
      setTotalCount(res.data.count);
    });
  }, [debouncedText, pageNumber]);

  const pageCount = Math.ceil(totalCount / limit);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const partnersData = (item) => {
    return (
      <tr key={item.id}>
        <td data-column="Name">
          <Link className="t-data" to={`${PATHS.PARTNERS}/${item.id}`}>
            {" "}
            {item.name}
          </Link>
        </td>
        <td data-column="Total students">{item.users}</td>
        {item.meraki_link ? (
          <td data-column="Meraki Link">
            <a
              className="meraki_link"
              target="_blank"
              rel="noopener noreferrer"
              href={item.meraki_link}
            >
              Get Link
            </a>
            <CopyToClipboard
              text={item.meraki_link}
              onCopy={() => {
                toast.success("Copied to Clipboard", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 1200,
                });
              }}
            >
              <i className="clipboard fa fa-copy"></i>
            </CopyToClipboard>
          </td>
        ) : (
          <td data-column="Meraki Link">
            <div
              className="create-link"
              onClick={() => createMerakiLink(item.id, "android")}
            >
              Create link
            </div>
          </td>
        )}
        {item.web_link ? (
          <td data-column="Meraki Link">
            <a
              className="meraki_link"
              target="_blank"
              rel="noopener noreferrer"
              href={item.web_link}
            >
              Get Link
            </a>
            <CopyToClipboard
              text={item.web_link}
              onCopy={() => {
                toast.success("Copied to Clipboard", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 1200,
                });
              }}
            >
              <i className="clipboard fa fa-copy"></i>
            </CopyToClipboard>
          </td>
        ) : (
          <td data-column="Meraki Link">
            <div
              className="create-link"
              onClick={() => createMerakiLink(item.id, "web")}
            >
              Create link
            </div>
          </td>
        )}
      </tr>
    );
  };

  const sortByName = () => {
    setAscendingPartnersNames(!ascendingPartnersNames);
    setAsscendingAlphabetically(true);
  };

  const sortByNumber = () => {
    setAscendingPartnerStudentsNumber(!ascendingPartnerStudentsNumber);
    setAsscendingAlphabetically(false);
  };

  const createMerakiLink = (id, platform) => {
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${id}/merakiLink`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
        platform: platform,
      },
    })
      .then((res) => {
        toast.success("Link created!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
      })
      .catch(() => {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
      });
  };

  return (
    <>
      <div className="table-container">
        <div className="container-for-search">
          <div>
            <input
              className="search-box"
              type="text"
              placeholder="Search..."
              value={searchTerm}
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
              onPageChange={changePage}
              pageCount={pageCount}
              containerClassName="paginationBttns"
              previousLinkClassName="previousBttn"
              nextLinkClassName="nextBttn"
              disabledClassName="paginationDisabled"
              activeClassName="paginationActive"
            />
          </div>
        </div>
        <table className="partners-table">
          <thead>
            <tr>
              <th>
                Partner's Name
                <button
                  type="button"
                  onClick={sortByName}
                  className="sortNameButton"
                >
                  <BsArrowUpDown />
                </button>
              </th>
              <th>
                Number of students
                <button
                  type="button"
                  onClick={sortByNumber}
                  className="sortNumberButton"
                >
                  <BsArrowUpDown />
                </button>
              </th>
              <th>Meraki - Android Link</th>
              <th>Meraki - Web Link</th>
            </tr>
          </thead>
          <tbody>
            {ascendingAlphabetically
              ? ascendingPartnersNames
                ? partners
                    .sort(function (a, b) {
                      const nameA = a.name.toLowerCase();
                      const nameB = b.name.toLowerCase();
                      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
                    })
                    .map((item) => {
                      return partnersData(item);
                    })
                : partners
                    .sort(function (a, b) {
                      const nameA = a.name.toLowerCase();
                      const nameB = b.name.toLowerCase();
                      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
                    })
                    .reverse()
                    .map((item) => {
                      return partnersData(item);
                    })
              : ascendingPartnerStudentsNumber
              ? partners
                  .sort(function (a, b) {
                    return b.users - a.users;
                  })
                  .map((item) => {
                    return partnersData(item);
                  })
              : partners
                  .sort(function (a, b) {
                    return a.users - b.users;
                  })
                  .map((item) => {
                    return partnersData(item);
                  })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default PartnerDashboard;
