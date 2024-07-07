import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useState } from "@wordpress/element";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import "./style.css";
import "./editor.css";
import "../../src/css/slick.css";
import "../../src/css/slick-theme.css";

const CarCarousel = ({ cars }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const brands = [...new Set(cars.map((car) => car.brand))];

  const handleCheckboxChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredCars = selectedBrands.length
    ? cars.filter((car) => selectedBrands.includes(car.brand))
    : cars;

  const settings = {
    dots: true,
    infinite: filteredCars.length > 1,
    speed: 500,
    slidesToShow: Math.min(3, filteredCars.length),
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className="car-carousel">
      <div className="filter-controls">
        {brands.map((brand) => (
          <label key={brand}>
            <input
              type="checkbox"
              value={brand}
              onChange={() => handleCheckboxChange(brand)}
            />
            {brand}
          </label>
        ))}
      </div>
      <Slider {...settings}>
        {filteredCars.map((car, index) => (
          <div key={index} className="car-item">
            <img src={car.image_url} alt={`${car.brand} ${car.model}`} />
            <h3>
              {car.brand} {car.model}
            </h3>
            <p>Price: ${car.price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

registerBlockType("speedster/car-carousel", {
  title: "Car Carousel",
  icon: "car",
  category: "speedster",
  edit: () => {
    const blockProps = useBlockProps();
    const [cars, setCars] = useState([]);

    useEffect(() => {
      fetch(`${window.location.origin}/car-data.json`)
        .then((response) => response.json())
        .then((data) => setCars(data));
    }, []);

    return (
      <div {...blockProps}>
        <CarCarousel cars={cars} />
      </div>
    );
  },
  save: () => {
    return (
      <div className="car-carousel-frontend">
        {/* The saved content will be replaced by JavaScript */}
      </div>
    );
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".car-carousel-frontend");

  elements.forEach((element) => {
    fetch(`${window.location.origin}/car-data.json`)
      .then((response) => response.json())
      .then((data) => {
        ReactDOM.render(<CarCarousel cars={data} />, element);
      });
  });
});
