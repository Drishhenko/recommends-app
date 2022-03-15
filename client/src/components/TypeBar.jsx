import React from "react";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Button} from "react-bootstrap";


const TypeBar = observer(({handleTypeBarClick}) => {
  const { overview } = useContext(Context);
 
   const handleClick = (type) => {
    overview.setSelectedType(type)
    handleTypeBarClick(type.id)
   } 

  return (
    <div className="d-flex w-100 flex-wrap" >
      {overview.types.map((type) => (
        <Button
          variant="light"
          key={type.id}
          className="p-2 m-2"
          active={type.id === overview.selectedType.id}
          onClick={() => handleClick(type)}
        >
          {type.name}
        </Button>
      ))}
    </div>
  );
});

export default TypeBar;
