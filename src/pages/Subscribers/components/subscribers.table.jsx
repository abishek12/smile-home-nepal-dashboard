import ItemNotFound from "../../../components/not-found/item.not.found";

const SubscribersTable = ({
  data,
  isFetching,
  isSuccess,
  totalSubscribers,
}) => {
  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-neutral-200 shadow-sm">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
        <p className="text-neutral-500 font-medium">Loading subscribers...</p>
      </div>
    );
  }
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="w-full overflow-x-auto custom-scrollbar">
        {(!totalSubscribers || totalSubscribers.length === 0) && isSuccess ? (
          <ItemNotFound title="Subscribers" />
        ) : (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs whitespace-nowrap">
                  Email
                </th>
                <th className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 bg-white">
              {data?.map((element) => {
                <tr
                  key={element?.id}
                  className="hover:bg-neutral-50/50 transition-colors group"
                >
                  <td className="py-4 px-6">{element?.email}</td>
                  <td className="py-4 px-6">{element?.status}</td>
                </tr>;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SubscribersTable;
