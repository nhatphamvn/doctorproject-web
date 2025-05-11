import React from "react";

const AddressAndPrice = ({ locale, prices }) => {
  const priceEn = prices?.priceData?.valueEn || "";
  const priceVi = prices?.priceData?.valueVi || "";

  return (
    <div className="w-72 ">
      <div className="ml-2 font-semibold text-base text-gray-400">
        Địa Chỉ Khám
        <div className="text-sm text-black ">
          {prices?.nameClinic && <p>{prices.nameClinic}</p>}
        </div>
        <div className="text-xs text-black ">
          {prices?.addressClinic && <p>{prices.addressClinic}</p>}
        </div>
      </div>

      <div className="text-gray-400 ml-2 font-semibold text-bas flex items-center space-x-2 mt-2">
        <span>Giá Khám :</span>
        <div className="text-sm text-black">
          {prices?.priceData && (
            <p className="m-0 p-0">
              {locale === "vi" ? `${priceVi} VND` : `${priceEn} USD`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressAndPrice;
