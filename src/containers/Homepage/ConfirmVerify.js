import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ConfirmVerifyBooking } from "../../service/otherUserService";

const ConfirmVerify = () => {
  const [searchParams] = useSearchParams();
  const [verify, setVerify] = useState(false);
  const [message, setMessage] = useState("");

  const token = searchParams.get("token");
  const doctorId = searchParams.get("doctorId");

  useEffect(() => {
    const verifyBooking = async () => {
      if (token && doctorId) {
        try {
          const res = await ConfirmVerifyBooking({
            token,
            doctorId,
          });

          if (res && res.DT.EC === 0) {
            setVerify(true);
            setMessage(res.DT.EM);
          } else {
            setVerify(false);
            setMessage(res.DT.EM);
          }
        } catch (error) {
          setVerify(false);
          setMessage("Đã có lỗi xảy ra khi xác minh.");
        }
      } else {
        setMessage("Thiếu token hoặc doctorId.");
      }
    };

    verifyBooking();
  }, [token, doctorId]);

  return (
    <>
      <div className="flex flex-col w-full h-96 items-center justify-center bg-white">
        <h2 className="text-4xl font-bold text-red-600 mb-4">
          Xác minh Lịch Khám
        </h2>
        <h1 className="text-2xl text-red-500">{message}</h1>
      </div>
    </>
  );
};

export default ConfirmVerify;
