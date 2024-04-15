import React from "react";

const Button = ({ classes, attributes, content, onClickFunc }) => {
   return (
      <button
         className={classes.join(" ")}
         {...attributes}
         onClick={onClickFunc}
      >
         {content}
      </button>
   );
};

export default Button;
