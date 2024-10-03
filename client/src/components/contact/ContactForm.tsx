import { ChangeEvent, useState } from "react";
import emailIcon from "/cemail.svg";
import phoneIcon from "/cphone.svg";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

interface Data {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  department: string;
}
const ContactForm = () => {
  const [data, setData] = useState<Data>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    department: "",
  });
  const [error, setError] = useState("");
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev: Data) => ({ ...prev, [name]: value }));
  };
  const HandleSubmit = () => {
    const { firstName, lastName, phone, email, department } = data;
    if (!firstName || !lastName || !phone || !email || !department)
      return setError("Please Fill All the fields");
    setError("");
    postForm();
  };
  const postForm = async () => {
    try {
      const response = await axiosInstance.post("/api/contactform/post", data);
      if (response.data?.message) {
        toast.success(response.data.message);
        // Reset form fields after successful submission
        setData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
          department: "",
        });
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again later.");
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="bg-[#D7F0FF] ">
        <div className="container mx-auto flex flex-col lg:flex-row py-8 gap-20 justify-between">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl text-[#221F1F]">
              We're here to help! Contact us
            </h2>
            <p className="text-md">
              Once you've filled out the form, expect to hear from us shortly.
            </p>
            <div className="flex flex-col  gap-4 md:w-1/2">
              <p className="max-w-md">
                SM - OFFICE - B1 - CENTER F002 OPPOSITE TO AJMAN PORT AND
                CUSTOMS AJMAN UNITED ARAB EMIRATES.
              </p>
              <div className="bg-white py-2 px-3 flex gap-2 max-w-xs">
                <img src={emailIcon} alt="email" />
                <a href="mailto:sales@turcon.in">sales@turcon.in</a>
              </div>
              <div className="bg-white py-2 px-3 flex gap-2 max-w-xs">
                <img src={phoneIcon} alt="phone" />

                <a href="tel:+971564507734">+971564507734</a>
              </div>
            </div>
          </div>
          <form className="flex flex-col">
            <div className="grid md:grid-cols-2 items-center gap-4">
              <div className="form-group flex flex-col gap-3 ">
                <label
                  htmlFor="firstName"
                  className="block w-full max-w-sm mx-auto"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleInputChange}
                  value={data.firstName}
                  placeholder="Enter the First Name"
                  className="input input-bordered w-full max-w-sm mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col gap-3">
                <label
                  htmlFor="lastName"
                  className="block w-full max-w-sm mx-auto"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter the Last Name"
                  className="input input-bordered w-full max-w-sm mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col gap-3">
                <label
                  htmlFor="email"
                  className="block w-full max-w-sm mx-auto"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={data.email}
                  placeholder="Enter the Email"
                  className="input input-bordered w-full max-w-sm mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:border-[#11A3FF] ring-0 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col gap-3">
                <label
                  htmlFor="phone"
                  className="block w-full max-w-sm mx-auto"
                >
                  Phone
                </label>
                <input
                  type="phone"
                  name="phone"
                  onChange={handleInputChange}
                  value={data.phone}
                  placeholder="Enter the Phone Number"
                  className="input input-bordered w-full max-w-sm mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
              </div>
            </div>
            <div className="grid">
              <div className="form-group flex flex-col gap-3 mt-3 self-start w-full">
                <label
                  htmlFor="department"
                  className="block w-full mx-auto max-w-sm md:max-w-none "
                >
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleInputChange}
                  value={data.department}
                  className="select select-primary w-full mx-auto max-w-sm  md:max-w-none border-[#DFE1E6]  focus:outline-none active:border-[#11A3FF] hover:border-[#11A3FF] focus:border-[#11A3FF] text-[#7A869A]"
                >
                  <option defaultValue={""}>Select Department</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                  <option value="enquiry">Enquiry</option>
                </select>
              </div>
              <div className="form-group flex flex-col gap-3 mt-3 self-start w-full mx-auto max-w-sm md:max-w-none ">
                <label htmlFor="message" className="block w-full ">
                  Message
                </label>
                <textarea
                  name="message"
                  value={data.message}
                  onChange={handleInputChange}
                  className="textarea textarea-info rounded-sm  w-full mx-auto max-w-md md:max-w-none  border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                  placeholder="Message"
                ></textarea>
              </div>
            </div>

            <div className="text-center mt-4">
              {error && (
                <p className="text-xs text-red-600 text-center mb-3">{error}</p>
              )}
              <div
                onClick={HandleSubmit}
                className="btn text-white rounded bg-[#005e99] hover:bg-[#008fe8] focus:bg-[#004a79] active:bg-[#004a79]"
              >
                Send Message
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
