import { useGetUsersQuery } from "../../features/users/userApiSlice";

import TableHeader from "../../components/header/table.header";

import UserTable from "./components/user.table";

const User = () => {
  // const [page, setPage] = useState(1);
  const { data, isFetching, isSuccess } = useGetUsersQuery({
    page: 1,
    limit: 10,
  });

  const totalUsers = data?.pagination?.totalCount;

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header */}
      <TableHeader
        title="User"
        subtitle="user"
        totalItem={totalUsers}
        path="/users/create"
      />
      <UserTable
        data={data?.items}
        isFetching={isFetching}
        isSuccess={isSuccess}
        totalUsers={totalUsers}
      />
    </div>
  );
};

export default User;
