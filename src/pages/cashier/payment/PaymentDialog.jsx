import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectNote,
  selectPaymentMethod,
  selectSelectedCustomer,
  selectTotal,
  setCurrentOrder,
  setPaymentMethod,
} from "../../../Redux Toolkit/features/cart/cartSlice";
import { useToast } from "../../../components/ui/use-toast";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../Redux Toolkit/features/order/orderThunks";
import { paymentMethods } from "./data";

const PaymentDialog = ({
  showPaymentDialog,
  setShowPaymentDialog,
  setShowReceiptDialog,
}) => {
  const paymentMethod = useSelector(selectPaymentMethod);
  const {toast} = useToast();
  const cart = useSelector(selectCartItems);
  const branchState = useSelector((state) => state.branch.branch);
  const { userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const selectedCustomer = useSelector(selectSelectedCustomer);
  const total = useSelector(selectTotal);
  const note = useSelector(selectNote);

  const activeBranchId = branchState?.id || userProfile?.branchId || userProfile?.branch?.id;

  const processPayment = async () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before processing payment",
        variant: "destructive",
      });
      return;
    }

    if (selectedCustomer && selectedCustomer.phone) {
      const cleanPhone = String(selectedCustomer.phone).replace(/\s+/g, "").replace(/[-()]/g, "");
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        toast({
          title: "Invalid Customer Phone Number",
          description: "Please enter a valid 10 digit mobile number",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      // Prepare order data according to OrderDTO structure
      const orderData = {
        totalAmount: Number((total || 0).toFixed(2)),
        branchId: activeBranchId ? Number(activeBranchId) : null,
        cashierId: userProfile?.id || null,
        customer: selectedCustomer || null,
        items: cart.map((item) => {
          const itemPrice = Number(item.price ?? item.sellingPrice ?? item.mrp ?? 0);
          const qty = Number(item.quantity || 1);
          return {
            productId: item.id,
            quantity: qty,
            price: itemPrice,
            total: itemPrice * qty,
          };
        }),
        paymentType: paymentMethod,
        note: note || "",
      };

      console.log("Creating order:", orderData);

      // Create order
      const createdOrder = await dispatch(createOrder(orderData)).unwrap();
      dispatch(setCurrentOrder(createdOrder));

      setShowPaymentDialog(false);
      setShowReceiptDialog(true);

      toast({
        title: "Order Created Successfully",
        description: `Order #${createdOrder.id} created and payment processed`,
      });
    } catch (error) {
      console.error("Failed to create order:", error);
      toast({
        title: "Order Creation Failed",
        description: error || "Failed to create order. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentMethod = (method) => dispatch(setPaymentMethod(method));

  return (
    <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              ₹{total.toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">Amount to be paid</p>
          </div>

          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <Button
                key={method.key}
                variant={paymentMethod === method.key ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handlePaymentMethod(method.key)}
              >
                {method.label}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
            Cancel
          </Button>
          <Button onClick={processPayment}>Complete Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
