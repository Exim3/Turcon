const ContactForm = () => {
  return (
    <>
      <div className="bg-[#D7F0FF] mt-4">
        <div className="container mx-auto flex flex-col lg:flex-row py-8 gap-20 justify-between">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl text-[#221F1F]">
              We're here to help! Contact us
            </h2>
            <p className="text-sm">
              Once you've filled out the form, expect to hear from us shortly.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="grid md:grid-cols-2 items-center gap-4">
              <div className="form-group flex flex-col gap-3 ">
                <label htmlFor="" className="block w-full max-w-sm mx-auto">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter the First Name"
                  className="input input-bordered w-full max-w-sm mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col gap-3">
                <label htmlFor="" className="block w-full max-w-sm mx-auto">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter the Last Name"
                  className="input input-bordered w-full max-w-sm mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col gap-3">
                <label htmlFor="" className="block w-full max-w-sm mx-auto">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter the Email"
                  className="input input-bordered w-full max-w-sm mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:border-[#11A3FF] ring-0 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col gap-3">
                <label htmlFor="" className="block w-full max-w-sm mx-auto">
                  Phone
                </label>
                <input
                  type="phone"
                  placeholder="Enter the Phone Number"
                  className="input input-bordered w-full max-w-sm mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
              </div>
            </div>
            <div className="grid">
              <div className="form-group flex flex-col gap-3 mt-3 self-start w-full">
                <label
                  htmlFor=""
                  className="block w-full mx-auto max-w-sm md:max-w-none "
                >
                  Department
                </label>
                <select className="select select-primary w-full mx-auto max-w-sm  md:max-w-none border-[#DFE1E6]  focus:outline-none active:border-[#11A3FF] hover:border-[#11A3FF] focus:border-[#11A3FF] text-[#7A869A]">
                  <option disabled selected>
                    Select Department
                  </option>
                  <option>Sales</option>
                  <option>Support</option>
                  <option>Enquiry</option>
                </select>
              </div>
              <div className="form-group flex flex-col gap-3 mt-3 self-start w-full mx-auto max-w-sm md:max-w-none ">
                <label htmlFor="" className="block w-full ">
                  Message
                </label>
                <textarea
                  className="textarea textarea-info rounded-sm  w-full mx-auto max-w-md md:max-w-none  border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                  placeholder="Message"
                ></textarea>
              </div>
            </div>
            <div className="text-center mt-4">
              <div className="btn text-white rounded bg-[#005e99] hover:bg-[#008fe8] focus:bg-[#004a79] active:bg-[#004a79]">
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
