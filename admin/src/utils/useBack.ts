import { useNavigate } from "react-router";
import { smoothScrollToTop } from "./SmoothScrollToTop";

export const useBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    smoothScrollToTop(2000);

    navigate(-1);
  };

  return goBack;
};
