import { ProductListType } from "./../types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type initialStateType = {
  productList: ProductListType[];
  filter: { status: string; client: string };
  selectedProduct: ProductListType | undefined;
};
const initialState: initialStateType = {
  productList: [],
  filter: { status: "All", client: "All" },
  selectedProduct: undefined,
};

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<ProductListType[]>) => {
      state.productList = action.payload;
    },
    deleteProduct: (state, action) => {
      state.productList = state.productList.filter(
        (product) => product.id !== action.payload
      );
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.filter.status = action.payload;
    },
    changeClient: (state, action) => {
      state.filter.client = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<ProductListType>) => {
      state.selectedProduct = action.payload;
    },
  },
});
export const ProductList = (state: RootState) => state.product.productList;
const filterStatusSelector = (state: RootState) => state.product.filter.status;
const filterClientSelector = (state: RootState) => state.product.filter.client;
export const filterProductList = createSelector(
  ProductList,
  filterStatusSelector,
  filterClientSelector,
  (products, status, client) => {
    return products.filter((product) => {
      return (
        (status === "All" || product.status === status) &&
        (client === "All" || product.client === client)
      );
    });
  }
);
export const {
  setProductList,
  deleteProduct,
  changeStatus,
  changeClient,
  setSelectedProduct,
} = productListSlice.actions;

const productListReducer = productListSlice.reducer;
export default productListReducer;
