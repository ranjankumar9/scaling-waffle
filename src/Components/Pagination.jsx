import React from 'react';
import { Button } from '@chakra-ui/react';

// Pagination component
export const Pagination = ({ page, setPage }) => {
    return (
        // Container for pagination buttons
        <div className='pagination'>
            {/* Button to navigate to the previous page */}
            <Button onClick={() => setPage(page - 1)} isDisabled={page === 1}>
                Prev
            </Button>
            
            {/* Button displaying the current page */}
            <Button>{page}</Button>
            
            {/* Button to navigate to the next page */}
            <Button onClick={() => setPage(page + 1)}>Next</Button>
        </div>
    );
};