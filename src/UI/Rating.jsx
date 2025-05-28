import { useState } from "react";

export default function Rating({ maxStars = 5 }) {
  const [rating, setRating] = useState(0); // Default rating is 0 (hidden)
  const [hover, setHover] = useState(0);

  const handleMouseMove = (event, starValue) => {
    const { offsetX, target } = event.nativeEvent;
    const halfStar = offsetX < target.clientWidth / 2 ? 0.5 : 1;
    setHover(starValue - 1 + halfStar);
  };

  const handleClick = () => {
    setRating(hover);
  };

  return (
    <div className="rating-container">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={`star ${
              starValue - 0.5 <= (hover || rating) ? "half-filled" : ""
            } ${starValue <= (hover || rating) ? "filled" : ""}`}
            onMouseMove={(event) => handleMouseMove(event, starValue)}
            onMouseLeave={() => setHover(0)}
            onClick={handleClick}
          >
            ★
          </span>
        );
      })}
      {/* Only display rating if it's greater than 0 */}
      {rating > 0 && <span className="rating-value">{rating.toFixed(1)}</span>}
    </div>
  );
}
