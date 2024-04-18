import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import './pagination.css'
import ShowIcon from '../ShowIcon';

const Pagination = ({ itemsPerPage, items, setCurrentItems }) => {
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
    }, [itemOffset, items, itemsPerPage, setCurrentItems]);

    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    return (
        <div className='w-full flex justify-center'>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<ShowIcon name={"gr-form-next"} />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                pageLinkClassName="mx-2 flex items-center justify-center font-bold rounded-full w-8 h-8"
                activeLinkClassName='inline-block flex items-center hover:bg-blue-600 justify-center bg-blue-500 text-white rounded-full w-8 h-8'
                previousLabel={<ShowIcon name={"gr-form-previous"} />}
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Pagination;
