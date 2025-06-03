import { useState } from "react";
import CreateScheduleSection from "../../containers/Section/doctor/pages/CreateScheduleSection "; // Adjust the path as needed
import { FormattedMessage } from "react-intl";
const ParentComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null); // Optional: Store data for the modal

  // Function to open the modal
  const openModal = () => {
    // Optional: Set data for the modal if needed
    setModalData({
      // Example data, replace with actual data as needed
      doctorId: "123",
      date: "2025-06-01",
      timeType: "T1",
      timeTypeData: { valueVi: "8:00 - 9:00", valueEn: "8:00 AM - 9:00 AM" },
      nameData: { username: "Dr. John Doe" },
    });
    setShowModal(true);
  };

  return (
    <div className="p-4">
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="px-2 py-2 bg-blue-500 text-white rounded-3xl font-lato hover:bg-blue-600 text-xs md:text-base"
        aria-label="Đặt lịch hẹn"
      >
        <FormattedMessage id="navBar.booking" />
      </button>

      {/* Render the modal */}
      <CreateScheduleSection
        show={showModal}
        setShow={setShowModal}
        data={modalData}
      />
    </div>
  );
};

export default ParentComponent;
