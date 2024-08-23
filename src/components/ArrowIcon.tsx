import { FaArrowAltCircleUp, FaArrowCircleDown } from "react-icons/fa";


interface ArrowIconProps {
    isScrolledDown: boolean
    onClick: () => void
}

const ArrowIcon = ({ isScrolledDown, onClick }: ArrowIconProps) => {
    return (
        <div className="arrow-icon" onClick={onClick}>
            {isScrolledDown ? <FaArrowAltCircleUp color="white" size={30} /> : <FaArrowCircleDown color="white" size={30} />}
        </div>
    );
};

export default ArrowIcon;