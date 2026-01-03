import { useState } from "react";

import { useGetFaqsQuery } from "../../features/faq/faqApiSlice";
import TableHeader from "../../components/header/table.header";

const FAQ = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching, isSuccess } = useGetFaqsQuery({
    page,
    limit: 10,
  });

  const [openIds, setOpenIds] = useState([]);

  const totalFaqs =
    data?.pagination?.totalCount || data?.pagination?.total || 0;

  const toggleFAQ = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header */}
      <TableHeader title="FAQ's" subtitle="question" totalItem={totalFaqs} />
      {/* FAQ List */}
      {isFetching ? (
        <p>Loading</p>
      ) : (
        <div className="card">
          <div className="space-y-4">
            {totalFaqs === 0 && isSuccess ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No FAQs found</p>
              </div>
            ) : (
              data?.items?.map((faq) => {
                const isOpen = openIds.includes(faq._id || faq.id);
                return (
                  <div
                    key={faq._id || faq.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <button
                      onClick={() => toggleFAQ(faq._id || faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex items-center space-x-4 flex-1 text-left">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Edit functionality
                          }}
                          className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Delete functionality
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                        <svg
                          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                            isOpen ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;
