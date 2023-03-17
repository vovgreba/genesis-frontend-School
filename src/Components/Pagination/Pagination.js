import React from 'react';
import { Pagination, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PaginationPage({ onChange, currentPage, lastPages}) {
  const navigate = useNavigate();

  const handlePageChange = (event, value) => {
    // update the URL with the new page number
    navigate(`?page=${value}`);
    // update the current page state
    onChange(event, value);
  };

  return (
    <>
      <Stack spacing={5}>
        <Pagination 
        count={lastPages || 0} 
        variant="outlined" 
        color="primary"
        page={currentPage}
        onChange={handlePageChange}
        />
      </Stack>
    </>

  )
}

export default PaginationPage;