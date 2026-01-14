import { useState, useEffect } from "react";
import { useGetServicesQuery } from "../../features/services/serviceApiSlice";

import TableHeader from "../../components/header/table.header";

import ServicesTable from "./components/service.table";
import Pagination from "../../components/pagination/Pagination";
import { Search } from "lucide-react";

const Services = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on search
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, isFetching, isSuccess } = useGetServicesQuery({
    search: debouncedSearch,
    sortBy: sortBy,
    sortOrder: sortOrder,
    page: page,
  });

  const totalServices = data?.pagination?.totalCount;

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
  };

  return (
    <section className="p-4 md:p-8 min-h-screen bg-neutral-50 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <TableHeader
          title="Service"
          subtitle="service"
          totalItem={totalServices}
          path="/service/create"
        />

        {/* Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <ServicesTable
            data={data?.items}
            isFetching={isFetching}
            isSuccess={isSuccess}
            totalServices={totalServices}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
          <Pagination
            pagination={data?.pagination}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
