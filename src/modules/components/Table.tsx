import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  filterProductList,
  setProductList,
} from "../../redux/productListSlice";
import { useNavigate } from "react-router-dom";
import { ProductListType, StatusColorType } from "../../types";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_PATHS } from "../../configs/api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import moment from "moment";

export default function Table() {
  const productList = useSelector(filterProductList);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const statusColor: StatusColorType = useMemo(
    () => ({
      RECEIVED: "text-blue-400",
      PENDING: "text-gray-400",
      FULFILLED: "text-green-400",
      PROCESSING: "text-yellow-400",
    }),
    []
  );
  const columns = useMemo(
    () => [
      {
        field: "status",
        headerName: "Status",
        width: 150,
        headerClassName: "font-black",
        cellClassName: (params: GridCellParams<ProductListType>) => {
          return statusColor[params.row.status];
        },
      },
      {
        field: "createdAt",
        headerName: "Date",
        width: 120,
        valueFormatter: ({ value }: { value: string }) =>
          moment(value).format("D MMM YYYY"),
        headerClassName: "font-bold",
      },
      {
        field: "client",
        headerName: "Client",
        width: 120,
        headerClassName: "font-bold ",
      },
      {
        field: "currency",
        headerName: "Currency",

        width: 120,
        headerClassName: "font-bold ",
      },
      {
        field: "total",
        headerName: "Total",
        valueFormatter: ({ value }: { value: number }) =>
          `$${value.toLocaleString()}`,
        width: 130,
        headerClassName: "font-bold",
      },
      {
        field: "invoice",
        headerName: "Invoice",
        type: "string",
        width: 110,
        headerClassName: "font-bold ",
      },
      {
        field: "action",
        headerName: "Actions",
        width: 170,
        headerClassName: "font-bold ",
        renderCell: (params: any) => (
          <div className="focus:!outline-none">
            <button
              className="border border-blue-900 px-3 py-1 rounded-3xl text-blue-900"
              onClick={() => {
                nav(`/product/${params.id}`);
              }}
            >
              View Details
            </button>
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteProduct(params.id)}
            >
              <DeleteIcon className="text-red-600" />
            </IconButton>
          </div>
        ),
      },
    ],
    [nav, statusColor]
  );
  const handleDeleteProduct = async (id: number) => {
    await axios.delete(`${API_PATHS.getProduct}/${id}`, {
      headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) },
    });
    dispatch(deleteProduct(id));
  };
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(API_PATHS.getProduct, {
        headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) },
      });
      const list = await res.data.data;
      dispatch(setProductList(list));
    };
    getData();
  }, [dispatch]);

  return (
    <DataGrid
      className="outline-none"
      rows={productList}
      columns={columns}
      disableRowSelectionOnClick
      disableColumnMenu
      pageSizeOptions={[5]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 5, page: 0 },
        },
      }}
    />
  );
}
