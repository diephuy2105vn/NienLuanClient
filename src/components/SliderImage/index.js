import { useState, useRef, useEffect } from "react";

import classNames from "classnames/bind";
import styles from "./SliderImage.module.scss";
import { GrNext, GrPrevious } from "react-icons/gr";
import Icon from "../Icon";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const SliderImage = ({ items, size, currentImage, setCurrentImage }) => {
    const [disable, setDisable] = useState({ prev: false, next: false });
    const sliderRef = useRef(null);
    const sliderItemRef = useRef(null);

    const movePrev = () => {
        currentImage > 0 && setCurrentImage((prevState) => prevState - 1);
    };

    const moveNext = () => {
        currentImage < items.length - size &&
            setCurrentImage((prevState) => prevState + 1);
    };

    useEffect(() => {
        if (sliderRef.current !== null && sliderItemRef.current !== null) {
            sliderRef.current.scrollLeft =
                sliderItemRef.current.offsetWidth * currentImage;
        }

        if (currentImage <= 0) {
            setDisable((prevState) => ({ ...prevState, prev: true }));
        } else setDisable((prevState) => ({ ...prevState, prev: false }));
        if (currentImage >= items.length - size) {
            setDisable((prevState) => ({ ...prevState, next: true }));
        } else setDisable((prevState) => ({ ...prevState, next: false }));
    }, [currentImage, items.length]);

    return (
        <div className={cx("wrapper")}>
            <Icon
                className={cx("btn-prev", {
                    disable: disable.prev,
                })}
                onClick={() => {
                    movePrev();
                }}>
                <GrPrevious />
            </Icon>
            <Icon
                className={cx("btn-next", {
                    disable: disable.next,
                })}
                onClick={() => moveNext()}>
                <GrNext />
            </Icon>

            <div
                className={cx("slider", {
                    "col-1": size === 1,
                    "col-2": size === 2,
                    "col-3": size === 3,
                    "col-4": size === 4,
                })}
                ref={sliderRef}>
                {items.map((item, index) =>
                    item.to ? (
                        <Link
                            to={item.to}
                            key={index}
                            className={cx("slider-item")}
                            ref={sliderItemRef}>
                            <img
                                src={
                                    typeof item == "object" ? item.image : item
                                }
                                alt=""
                            />
                        </Link>
                    ) : (
                        <div
                            key={index}
                            className={cx("slider-item")}
                            ref={sliderItemRef}>
                            <img
                                src={
                                    typeof item == "object" ? item.image : item
                                }
                                alt=""
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default SliderImage;
