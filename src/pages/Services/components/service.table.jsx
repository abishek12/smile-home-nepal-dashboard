import ItemNotFound from "../../../components/not-found/item.not.found";

const ServicesTable = ({ data, isFetching, isSuccess, totalServices }) => {
  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
        <p className="text-neutral-500 font-medium">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      {totalServices === 0 && isSuccess ? (
        <ItemNotFound title="Services" />
      ) : (
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs">
                Service Name
              </th>
              <th className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs">
                Base Price
              </th>
              <th className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs">
                Created At
              </th>
              <th className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs text-right">
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
                  <span className="font-medium text-neutral-900">
                    {element?.service_name}
                  </span>
                </td>
                <td className="py-4 px-6 text-neutral-600">
                  <span className="flex items-center">
                    <span className="text-neutral-400 mr-0.5">$</span>
                    {element?.base_price}
                  </span>
                </td>
                <td className="py-4 px-6 text-neutral-500">
                  {new Date(element?.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-4 px-6 text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      element?.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {element?.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServicesTable;
