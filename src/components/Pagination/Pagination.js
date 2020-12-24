import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getPagePosts } from "../../redux/reducers/postReducer";
import { useDispatch } from "react-redux";

const PaginationContainer = styled.div`
  margin: 20px auto;
  text-align: center;
`;
const PageButton = styled.button`
  border: 0.5px solid #ddd;
  font-size: 16px;
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 8px;
  background: ${(props) =>
    props.active ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)"};

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;

export default function Pagination({ pageNumberCount, limit }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickPage = (page) => {
    dispatch(getPagePosts(page, limit));
    setCurrentPage(page);
  };

  return (
    <PaginationContainer>
      {pageNumberCount.map((page) => (
        <PageButton
          active={page === currentPage}
          onClick={() => handleClickPage(page)}
        >
          {page}
        </PageButton>
      ))}
    </PaginationContainer>
  );
}

Pagination.propTypes = {
  setPosts: PropTypes.func,
  pageNumberCount: PropTypes.array,
  limit: PropTypes.number,
};
