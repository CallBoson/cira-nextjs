import "./style.css";
import { cn } from "../../../../../../../libs/utils";

export default function Loader({ className }) {
  const classNames = cn("scale-50 origin-left", className);
  return (
    <div className={classNames}>
      <div className="spinner">
        <div className="spinner1"></div>
      </div>
    </div>
  );
}
