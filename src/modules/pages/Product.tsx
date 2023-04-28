import FilterBar from "../components/FilterBar";
import Table from "../components/Table";

export default function Product() {
  return (
    <div className="flex flex-col justify-center w-3/5 mx-auto mt-10">
      <FilterBar />
      <Table />
    </div>
  );
}
