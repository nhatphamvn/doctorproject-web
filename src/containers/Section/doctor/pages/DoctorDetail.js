import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchDoctorById,
  fetchPricesDoctors,
} from "../../../../redux/features/doctorSlide/actions/doctorActions";
import bgImage from "../../../../assets/image/banner-spe.png";
import Footer from "../../../Footer/pages/Footer";
import Schedules from "./Schedules";
import AddressAndPrice from "./AddressAndPrice";

const DoctorDetail = () => {
  const { id } = useParams();
  const { doctor, isLoading, prices } = useSelector((state) => state.doctors);
  const locale = useSelector((state) => state.language.locale);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorById(id));
    dispatch(fetchPricesDoctors(id));
  }, [dispatch, id]);

  if (!doctor || !doctor.positionData) return null;
  if (isLoading)
    return (
      <div className="text-center text-gray-600 py-10">
        Đang tải dữ liệu bác sĩ...
      </div>
    );

  let nameVi = `${doctor.positionData?.valueVi} - ${doctor.username}`;
  let nameEn = `${doctor.positionData?.valueEn} - ${doctor.username}`;

  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 min-h-screen">
        <div
          className="w-full h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Overlay gradient */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-50 to-transparent"></div>

          <div className="flex items-center h-full relative z-10">
            <div className="pl-8 md:pl-12 text-3xl md:text-4xl font-mono text-blue-400 drop-shadow-lg">
              Bác Sĩ
            </div>
          </div>
        </div>

        <div className="mt-12 w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-center gap-6 md:gap-10 px-4 md:px-0 mb-24">
          <div className="flex flex-col items-center gap-6">
            <div
              className="rounded-lg overflow-hidden border-4 border-blue-200 shadow-lg transform transition-transform hover:scale-105"
              style={{
                width: "256px", // Cố định kích thước ảnh
                height: "256px",
              }}
            >
              <img
                src={doctor.image}
                alt={doctor.username}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              <Schedules doctorId={id} />
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
            <div className="text-2xl md:text-3xl text-blue-600 font-lato font-semibold py-2">
              {locale === "vi" ? nameVi : nameEn}
            </div>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="text-base font-lato text-gray-700 w-full md:w-[60%] p-4 bg-blue-50 rounded-md">
                {doctor.MarkDown?.description && (
                  <span>{doctor.MarkDown.description}</span>
                )}
              </div>
              <div className="w-full md:w-[40%]">
                {doctor && <AddressAndPrice prices={prices} locale={locale} />}
              </div>
            </div>
            <div className="text-lg font-lato text-gray-800 mt-4 p-4 bg-gray-50 rounded-md">
              {doctor.MarkDown?.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: doctor.MarkDown.contentHTML,
                  }}
                />
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
