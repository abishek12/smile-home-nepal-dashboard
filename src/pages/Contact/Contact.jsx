import { useState } from "react";

import { useGetContactsQuery } from "../../features/contact/contactApiSlice";

const Contact = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching, isSuccess } = useGetContactsQuery({
    page,
    limit: 10,
  });

  const [selectedContact, setSelectedContact] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (data?.items === 0 && isSuccess) {
    return (
      <div className="text-center mt-2">
        <span className="text-neutralGreyDark text-base font-semibold">
          {" "}
          No Contacts found.
        </span>
        <p className="text-sm text-neutralGrey italic">
          Try with different search term or choosing a different tag
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Contact List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {isFetching ? (
          <p>Loading</p>
        ) : (
          <div className="lg:col-span-1 space-y-4">
            <div className="card p-0 max-h-[600px] overflow-y-auto custom-scrollbar">
              {data?.items?.length === 0 ? (
                <div className="p-8 text-center">
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
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">
                    No messages found
                  </p>
                </div>
              ) : (
                data.items.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 border-b border-gray-200 cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${
                      selectedContact?.id === contact.id ? "bg-primary-50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {contact.fullname}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {contact.subject}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {contact.date ?? "2025-05-12"}
                        </p>
                      </div>
                      <span
                        className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Detail View */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="card">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between pb-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedContact.subject}
                    </h2>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {selectedContact?.fullname ?? "John Doe"}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {selectedContact?.phone_number ?? "9800009900"}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {selectedContact.createdAt.substring(0, 10) ?? "N/A"}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      selectedContact.status
                    )}`}
                  >
                    {selectedContact.status}
                  </span>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedContact.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card h-full flex items-center justify-center">
              <div className="text-center">
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
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  Select a message to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
