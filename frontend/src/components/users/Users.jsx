import data from "@/components/table/data";
import { DataTable } from "@/components/data-table";

const Users = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <DataTable data={data} />
      </div>
    </>
  );
};

export default Users;
