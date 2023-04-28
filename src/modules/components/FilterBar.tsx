import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeClient, changeStatus } from "../../redux/productListSlice";
import { RootState } from "../../store";

export default function FilterBar() {
  const dispatch = useDispatch();
  const filterOption = useSelector((state: RootState) => state.product.filter);
  return (
    <div className="flex flex-row justify-between mb-5">
      <div className="flex flex-row">
        <select
          defaultValue={filterOption.status}
          onChange={(e) => {
            dispatch(changeStatus(e.target.value));
          }}
          className="w-40 h-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-1 "
        >
          <option value="All">Status</option>
          <option value="FULFILLED">Fulfilled</option>
          <option value="PROCESSING">Processing</option>
          <option value="PENDING">Pending</option>
          <option value="RECEIVED">Received</option>
        </select>
        <select
          defaultValue={filterOption.client}
          onChange={(e) => {
            dispatch(changeClient(e.target.value));
          }}
          className="w-40 h-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
        >
          <option value="All">Client</option>
          <option value="Chrome">Chrome</option>
          <option value="google">google</option>
          <option value="Cococ">Cococ</option>
        </select>
      </div>
    </div>
  );
}
