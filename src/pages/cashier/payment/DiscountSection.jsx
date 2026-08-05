import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectDiscount, setDiscount } from '../../../Redux Toolkit/features/cart/cartSlice';
import { Tag } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from "@/components/ui/input";

const DiscountSection = () => {
  const dispatch = useDispatch();
  const rawDiscount = useSelector(selectDiscount);

  const discountObj = typeof rawDiscount === 'object' && rawDiscount !== null
    ? rawDiscount
    : { value: typeof rawDiscount === 'number' ? rawDiscount : 0, type: 'percentage' };

  const handleSetDiscount = (e) => {
    const val = parseFloat(e.target.value) || 0;
    dispatch(
      setDiscount({ ...discountObj, value: val })
    );
  };

  return (
     <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Discount
        </h2>
        <div className="space-y-3">
          <Input
            type="number"
            placeholder="Discount amount"
            value={discountObj.value || ""}
            onChange={handleSetDiscount}
          />
          <div className="flex space-x-2">
            <Button
              variant={discountObj.type === "percentage" ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => dispatch(setDiscount({ ...discountObj, type: "percentage" }))}
            >
              %
            </Button>
            <Button
              variant={discountObj.type === "fixed" ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => dispatch(setDiscount({ ...discountObj, type: "fixed" }))}
            >
              ₹
            </Button>
          </div>
        </div>
      </div>
  );
};

export default DiscountSection