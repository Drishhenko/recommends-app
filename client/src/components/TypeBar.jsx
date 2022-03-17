import React from "react";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Button} from "react-bootstrap";


const TypeBar = observer(() => {
  const { overview } = useContext(Context);
 
  return (
    <div className="d-flex w-100 flex-wrap" >
      {overview.types.map((type) => (
        <Button
          variant="light"
          key={type.id}
          className="p-2 m-2"
          active={type.id === overview.selectedType.id}
          onClick={() => overview.setSelectedType(type)}
        >
          {type.name}
        </Button>
      ))}
    </div>
  );
});

export default TypeBar;
