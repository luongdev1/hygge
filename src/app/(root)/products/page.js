"use client";
import ListProduct from "@/app/components/ListProduct";
import SelectDropdown from "@/app/components/SelectDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/app/components/Pagination";
import LoadingA from "@/app/components/LoadingA";
import { api_get_ListProduct, api_get_TypeProduct } from "@/app/lib/api";

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchData, setFetchData] = useState();
  const [productTypes, setProductTypes] = useState();
  const [category, setCategory] = useState({ id_category: "", price: "", gia_tien: [] });
  useEffect(() => {
    const fetchData = axios
      .post(api_get_ListProduct, { page: currentPage, ...category })
      .then((res) => res.data.data);
    const fetchCategory = axios.get(api_get_TypeProduct).then((res) => {
      const formattedData = res.data.data.map((item) => ({
        id: item.id,
        name: item.ten_dong_san_pham,
      }));
      return formattedData;
    });
    Promise.all([fetchData, fetchCategory]).then(([data, category]) => {
      setFetchData(data);
      let newObject = { id: 0, name: "All" };
      category.unshift(newObject);
      setProductTypes(category);
    });
  }, [currentPage, category]);

  // loading
  if (!fetchData) {
    return <LoadingA />;
  }

  // pagination
  const count_product = fetchData?.total;
  const displayNP = 12;
  const pageCount = Math.ceil(count_product / displayNP);
  // handle change page
  const onPageChange = (e) => {
    setCurrentPage(e.selected + 1);
  };

  // category
  const list_price_range = [
    {
      id: 0,
      name: "All",
    },
    {
      id: 1,
      name: "$0 - $10",
    },
    {
      id: 2,
      name: "$10 - $20",
    },
    {
      id: 3,
      name: "$20 - $40",
    },
    {
      id: 4,
      name: "$40 - $100",
    },
    {
      id: 5,
      name: "$100+",
    },
  ];
  const list_sort_by = [
    {
      id: 1,
      name: "ASC",
    },
    {
      id: 2,
      name: "DESC",
    },
  ];

  // handle category
  const handleSelectColor = (id, name, title_select) => {
    if (title_select === "Category") {
      setCategory({ ...category, id_category: id });
    }
    if (title_select === "Price Range") {
      let gia_tien = [];
      switch (id) {
        case 0:
          gia_tien = [];
          break;
        case 1:
          gia_tien = [0, 10];
          break;
        case 2:
          gia_tien = [10, 20];
          break;
        case 3:
          gia_tien = [20, 40];
          break;
        case 4:
          gia_tien = [40, 100];
          break;
        case 5:
          gia_tien = [100, 0];
          break;
      }
      setCategory({ ...category, gia_tien });
    }
    if (title_select === "Sort By") {
      setCategory({ ...category, price: name });
    }
  };

  return (
    <div>
      <span className="label-1">- List Products -</span>
      <h1 className="title-1">our products</h1>
      <div className="flex justify-around m-5">
        <SelectDropdown
          items={productTypes}
          title_select="Category"
          handleSelect={handleSelectColor}
        ></SelectDropdown>
        <SelectDropdown
          items={list_price_range}
          title_select="Price Range"
          handleSelect={handleSelectColor}
        ></SelectDropdown>
        <SelectDropdown
          items={list_sort_by}
          title_select="Sort By"
          handleSelect={handleSelectColor}
        ></SelectDropdown>
      </div>
      {fetchData && <ListProduct prop_items={fetchData.data}></ListProduct>}
      {/* phan trang */}
      <Pagination
        onPageChange={onPageChange}
        pageCount={pageCount}
      />
    </div>
  );
}
