import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages, totalCount, limit } = pagination;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white border-t border-neutral-100 gap-4">
      <div className="text-sm text-neutral-500 font-medium order-2 sm:order-1">
        Showing <span className="text-neutral-900">{startItem}</span> to{" "}
        <span className="text-neutral-900">{endItem}</span> of{" "}
        <span className="text-neutral-900">{totalCount}</span> results
      </div>

      <nav
        className="flex items-center space-x-1 order-1 sm:order-2"
        aria-label="Pagination"
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-semibold transition-all ${
                page === currentPage
                  ? "bg-primary-600 text-white shadow-md shadow-primary-500/20"
                  : page === "..."
                  ? "text-neutral-400 cursor-default"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-primary-600 border border-transparent hover:border-neutral-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
