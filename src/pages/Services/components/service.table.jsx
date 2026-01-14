import ItemNotFound from "../../../components/not-found/item.not.found";
import { ChevronUp, ChevronDown, ArrowUpDown } from "lucide-react";

const ServicesTable = ({
  data,
  isFetching,
  isSuccess,
  totalServices,
  sortBy,
  sortOrder,
  onSort,
}) => {
  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
        <p className="text-neutral-500 font-medium">Loading services...</p>
      </div>
    );
  }

  const renderSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-neutral-400" />;
    }
    return sortOrder === "ASC" ? (
      <ChevronUp className="w-3.5 h-3.5 ml-1 text-primary-500" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 ml-1 text-primary-500" />
    );
  };

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      {totalServices === 0 && isSuccess ? (
        <ItemNotFound title="Services" />
      ) : (
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th
                className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => onSort("id")}
              >
                <div className="flex items-center">
                  Service Name
                  {renderSortIcon("id")}
                </div>
              </th>
              <th
                className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => onSort("price")}
              >
                <div className="flex items-center">
                  Base Price
                  {renderSortIcon("price")}
                </div>
              </th>
              <th
                className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => onSort("rating")}
              >
                <div className="flex items-center">
                  Rating
                  {renderSortIcon("rating")}
                </div>
              </th>
              <th
                className="py-4 px-6 font-semibold text-neutral-700 uppercase tracking-wider text-xs cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => onSort("createdAt")}
              >
                <div className="flex items-center">
                  Created At
                  {renderSortIcon("createdAt")}
                </div>
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
                    <span className="text-neutral-400 mr-0.5">Rs.</span>
                    {element?.base_price}
                  </span>
                </td>
                <td className="py-4 px-6 text-neutral-600">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    {element?.rating || "N/A"}
                  </div>
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
