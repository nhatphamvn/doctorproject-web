import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchDoctorById,
  fetchPricesDoctors,
} from "../../../../redux/features/doctorSlide/actions/doctorActions";
import bgImage from "../../../../assets/image/facility/banner-3.webp";
import Footer from "../../../Footer/pages/Footer";
import Schedules from "./Schedules";
import AddressAndPrice from "./AddressAndPrice";

const DoctorDetail = () => {
  const { id } = useParams();
  const { doctor, isLoading, prices } = useSelector((state) => state.doctors);
  const locale = useSelector((state) => state.language.locale);

  const dispatch = useDispatch();
  console.log("doctors prices", prices);

  useEffect(() => {
    dispatch(fetchDoctorById(id));
    dispatch(fetchPricesDoctors(id));
  }, [dispatch, id]);

  // Nếu doctor chưa có dữ liệu thì hiển thị đang tải
  if (!doctor || !doctor.positionData) return null;
  if (isLoading) return <div>Đang tải dữ liệu bác sĩ...</div>;

  // Xử lý ảnh nếu có
  let imagebase64 = "";
  if (doctor.image) {
    imagebase64 = atob(doctor.image);
  }

  // Tên hiển thị theo ngôn ngữ
  let nameVi = `${doctor.positionData?.valueVi} - ${doctor.username}`;
  let nameEn = `${doctor.positionData?.valueEn} - ${doctor.username}`;

  return (
    <>
      <div className="">
        <div
          className="w-full h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Overlay gradient */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/100 to-transparent"></div>

          <div className="flex items-center h-full relative z-10">
            <div className="pl-12 text-black text-3xl font-lato">Bác Sĩ</div>
          </div>
        </div>

        <div className="mt-12 w-full h-full flex justify-center gap-10 mb-24">
          <div className="flex flex-col items-center gap-4">
            <div className="w-72 h-72 border-gray-400 overflow-hidden">
              <img src={imagebase64} className="w-full h-full object-cover" />
            </div>
            <div>
              <Schedules doctorId={id} />
            </div>
          </div>
          <div className="h-full w-[50%]">
            <div className="text-2xl text-blue-400 font-sans">
              {locale === "vi" ? nameVi : nameEn}
            </div>
            <div className="flex items-center">
              <div className="text-base p-4 font-normal w-[60%]">
                {doctor.MarkDown?.description && (
                  <span>{doctor.MarkDown.description}</span>
                )}
              </div>
              {doctor && <AddressAndPrice prices={prices} locale={locale} />}
            </div>
            <div className="text-lg p-2 font-sans">
              {doctor.MarkDown?.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: doctor.MarkDown.contentHTML,
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorDetail;
