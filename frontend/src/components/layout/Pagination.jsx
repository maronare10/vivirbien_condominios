import React from 'react'
import { Link } from "react-router-dom";

const generatePages = (length) => Array(length).fill(0).map((value, index) => 1 + index)

const Pagination = ({ resource = '', pages = 1, currentPage = 1 }) => {

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {/* <li className="page-item ">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li> */}

        {generatePages(pages).map((page) => (
          <li className={`page-item ${ page === Number(currentPage) ? 'active' : '' }`} key={page}>
            <Link className="page-link" to={`/${resource}?page=${page}`}>
              {page}
            </Link>
          </li>
        ))}

        {/* <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li> */}
      </ul>
    </nav>
  )
}

export default Pagination
