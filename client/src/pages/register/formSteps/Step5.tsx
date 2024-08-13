import DragFile from "../../../components/dragFiles/DragFile";

export const Step5: React.FC<{
  handleBack: () => void;
  handleSubmit: () => void;
}> = ({ handleBack, handleSubmit }) => (
  <div className="body flex flex-col gap-4">
    <div className="text-center text-2xl">File Attachments</div>
    <div className="flex-col flex gap-2">
      <div className="text-md font-semibold text-center">
        Upload Company Registration or Incorporation or Tax Certificate
      </div>
      <DragFile />
    </div>
    <div className="flex justify-center gap-6 ">
      <div className="btn btn-secondbtn w-1/2 " onClick={handleBack}>
        Back
      </div>
      <div className="btn btn-prime w-1/2 " onClick={handleSubmit}>
        Submit
      </div>
    </div>
  </div>
);
