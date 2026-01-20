import ItemNotFound from "../../../components/not-found/item.not.found";

const BookingTable = ({ data, isFetching, isSuccess, totalBookings }) => {
  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-neutral-200 shadow-sm">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
        <p className="text-neutral-500 font-medium">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="w-full overflow-x-auto custom-scrollbar">
        {(!totalBookings || totalBookings === 0) && isSuccess ? (
          <div className="py-12">
            <ItemNotFound title="Booking" />
          </div>
        ) : (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs whitespace-nowrap">
                  Full Name
                </th>
                <th className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs whitespace-nowrap">
                  Contact Number
                </th>
                <th className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs whitespace-nowrap">
                  Email Address
                </th>
                <th className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs text-right whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 bg-white">
              {data?.map((element) => (
                <tr
                  key={element?.id}
                  className="hover:bg-neutral-50/50 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <span className="font-semibold text-neutral-900">
                      {element?.profile?.first_name}{" "}
                      {element?.profile?.last_name}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-neutral-600 font-medium">
                      {element?.phone_number || "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    <span className="text-neutral-500">
                      {element?.profile?.email ?? "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                      {element?.role.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingTable;
