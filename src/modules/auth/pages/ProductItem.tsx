import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_PATHS } from "../../../configs/api";
import { ProductListType } from "../../../types";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../../utils/constants";
import moment from "moment";
import { toast, Toaster } from "react-hot-toast";

export default function ProductItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productItem, setProductItem] = useState<ProductListType>({
    id: -1,
    status: "",
    currency: "",
    fundingMethod: "",
    total: 0,
    order: "",
    client: "",
    invoice: "",
    createdBy: 0,
    createdAt: "",
    updatedAt: "",
  });
  const getProductDetail = useCallback(async () => {
    const res = await axios.get(`${API_PATHS.getProduct}/${id}`, {
      headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) },
    });

    setProductItem(res.data.data);
  }, [id]);

  const handleChangeTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductItem((prev) => ({ ...prev, total: Number(event.target.value) }));
  };
  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProductItem((prev) => ({ ...prev, status: event.target.value }));
  };
  const handleSubmitChangeProduct = async () => {
    const data = {
      id: productItem.id,
      order: productItem.order,
      status: productItem.status,
      total: productItem.total,
      currency: productItem.currency,
      fundingMethod: productItem.fundingMethod,
    };
    try {
      await axios.put(`${API_PATHS.getProduct}`, data, {
        headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) },
      });
      toast.success("Updated!!!");
      setTimeout(() => {
        navigate("/product");
      }, 800);
    } catch {
      toast.error("Error!!!");
    }
  };
  useEffect(() => {
    getProductDetail();
  }, [id, getProductDetail]);

  return (
    <div>
      {productItem.id !== -1 ? (
        <form
          className="flex flex-col w-1/3  mx-auto mt-8 justify-between border rounded-lg border-gray-400 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitChangeProduct();
          }}
        >
          <div className="mb-3">
            <h2 className="font-bold">ID</h2>
            <div>{productItem.id}</div>
          </div>
          <div className="mb-3">
            <h2 className="font-bold">Order</h2>
            <div>{productItem.order}</div>
          </div>
          <div className="mb-3">
            <h2 className="font-bold">Status</h2>
            <select
              defaultValue={productItem.status}
              onChange={handleChangeStatus}
              className="w-40 h-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="FULFILLED">Fulfilled</option>
              <option value="PROCESSING">Processing</option>
              <option value="PENDING">Pending</option>
              <option value="RECEIVED">Received</option>
            </select>
          </div>
          <div className="mb-3">
            <h2 className="font-bold">Client</h2>
            <div>{productItem.client}</div>
          </div>
          <div className="mb-3">
            <h2 className="font-bold">Date</h2>
            <div>{moment(productItem.createdAt).format("D MMM YYYY")}</div>
          </div>
          <div className="mb-3">
            <h2 className="font-bold">Total</h2>
            <input
              className="w-30 h-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded "
              type="text"
              value={productItem.total}
              onChange={handleChangeTotal}
            />
          </div>
          <div className="mb-3">
            <h2 className="font-bold">Currency</h2>
            <div>{productItem.currency}</div>
          </div>
          <div className="mb-3">
            <h2 className="font-bold">Funding Method</h2>
            <div>{productItem.fundingMethod}</div>
          </div>
          <div>
            <button
              type="submit"
              className="text-white w-40 bg-blue-500 hover:bg-blue-600  rounded-lg px-5 py-2  "
            >
              Save Change
            </button>
          </div>
        </form>
      ) : (
        <div>Loading....</div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
