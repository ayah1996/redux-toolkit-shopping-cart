import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

import { cartActions } from "../../store/cart-slice";

const ProductItem = ({ title, price, description }) => {
  const dispatch = useDispatch();
  const productId = useId();

  const handleAddToCart = () => {
    dispatch(
      cartActions.addToCart({
        id: productId,
        title,
        price,
      })
    );
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
