import React from 'react';

const Pagination = ({ goToNextPage, goToPrevPage }) => {
    return (
        <div className="pagination">
            <button className="pagination__btn" onClick={goToPrevPage}>
                <i class="fas fa-arrow-left"></i>
            </button>
            <button className="pagination__btn" onClick={goToNextPage}>
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    )
}

export default Pagination;
