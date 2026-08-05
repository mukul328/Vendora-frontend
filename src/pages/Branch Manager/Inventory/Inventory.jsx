import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  getInventoryByBranch,
  createInventory,
  updateInventory,
} from "@/Redux Toolkit/features/inventory/inventoryThunks";

import { getProductsByStore } from "@/Redux Toolkit/features/product/productThunks";

import InventoryTable from "./InventoryTable";
import InventoryFilters from "./InventoryFilters";
import InventoryFormDialog from "./InventoryFormDialog";


const Inventory = () => {

  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state.user);
  const branch = useSelector((state) => state.branch.branch);
  const inventories = useSelector(
    (state) => state.inventory.inventories
  );
  const products = useSelector(
    (state) => state.product.products
  );

  const activeBranchId = branch?.id || userProfile?.branchId;
  const activeStoreId = branch?.storeId || userProfile?.storeId;

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [editInventory, setEditInventory] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);
  const [editProductId, setEditProductId] = useState("");

  // Load inventory + products
  useEffect(() => {
    if (activeBranchId) {
      dispatch(getInventoryByBranch(activeBranchId));
    }

    if (activeStoreId) {
      dispatch(getProductsByStore(activeStoreId));
    }
  }, [activeBranchId, activeStoreId, dispatch]);

  // Map inventory data with product data
  const inventoryRows = (inventories || []).map((inv) => {
    const product = (products || []).find(
      (p) => String(p.id) === String(inv.productId)
    ) || {};

    return {
      id: inv.id,
      sku: product.sku || inv.productId,
      name: product.name || "Unknown",
      quantity: inv.quantity,
      category: product.category || "",
      productId: inv.productId,
    };
  });

  // Search + category filter
  const filteredRows = inventoryRows.filter((row) => {
    const matchesSearch =
      row?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "all" ||
      !category ||
      row.category === category;

    return matchesSearch && matchesCategory;
  });

  // Add Inventory
  const handleAddInventory = async () => {
    if (
      !selectedProductId ||
      selectedProductId === "all" ||
      !quantity ||
      !activeBranchId
    ) return;

    const result = await dispatch(
      createInventory({
        branchId: Number(activeBranchId),
        productId: Number(selectedProductId),
        quantity: Number(quantity),
      })
    );

    if (createInventory.fulfilled.match(result)) {
      dispatch(getInventoryByBranch(activeBranchId));
    }

    setIsAddDialogOpen(false);
    setSelectedProductId("");
    setQuantity(1);
  };

  // Open Edit Dialog
  const handleOpenEditDialog = (row) => {
    setEditInventory(row);
    setEditQuantity(row.quantity);
    setEditProductId(row.productId);
    setIsEditDialogOpen(true);
  };

  // Update Inventory
  const handleUpdateInventory = async () => {
    if (
      !editInventory?.id ||
      !activeBranchId
    ) return;

    const result = await dispatch(
      updateInventory({
        id: editInventory.id,
        dto: {
          branchId: Number(activeBranchId),
          productId: Number(editInventory.productId),
          quantity: Number(editQuantity),
        },
      })
    );

    if (updateInventory.fulfilled.match(result)) {
      dispatch(getInventoryByBranch(activeBranchId));
    }

    setIsEditDialogOpen(false);
    setEditInventory(null);
    setEditQuantity(1);
  };







  return (

    <div className="space-y-6">


      <div className="flex justify-between items-center">


        <h1 className="text-3xl font-bold tracking-tight">
          Inventory Management
        </h1>



        <Button
          className="gap-2"
          onClick={()=>setIsAddDialogOpen(true)}
        >

          <Plus className="h-4 w-4"/>

          Add Inventory

        </Button>


      </div>





      <InventoryFilters

        searchTerm={searchTerm}

        onSearch={(e)=>setSearchTerm(e.target.value)}

        category={category}

        onCategoryChange={setCategory}

        products={products}

        inventoryRows={inventoryRows}

      />






      <InventoryTable

        rows={filteredRows}

        onEdit={handleOpenEditDialog}

      />







      <InventoryFormDialog


        open={isAddDialogOpen}

        onOpenChange={setIsAddDialogOpen}


        selectedProductId={selectedProductId}

        setSelectedProductId={setSelectedProductId}


        quantity={quantity}

        setQuantity={setQuantity}


        onSubmit={handleAddInventory}

        mode="add"


      />







      <InventoryFormDialog


        open={isEditDialogOpen}

        onOpenChange={setIsEditDialogOpen}


        selectedProductId={editProductId}

        setSelectedProductId={setEditProductId}


        quantity={editQuantity}

        setQuantity={setEditQuantity}


        onSubmit={handleUpdateInventory}

        mode="edit"


      />



    </div>

  );

};


export default Inventory;