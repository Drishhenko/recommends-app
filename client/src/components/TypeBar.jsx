import React from "react";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next'
import { Context } from "../index";
import { Button} from "react-bootstrap";


const TypeBar = observer(() => {
  const { overview } = useContext(Context);
  const { t } = useTranslation()

  return (
    <>
    <h3>{t('Categories')}:</h3>
    <div className="d-flex w-100 mb-4" >
      {overview.types.map((type) => (
        <Button
          variant="light"
          key={type.id}
          className="p-2 m-2"
          style={{fontSize: 20}}
          active={type.id === overview.selectedType.id}
          onClick={() => overview.setSelectedType(type)}
        >
          {type.name}
        </Button>
      ))}
    </div>
    </>
    
  );
});

export default TypeBar;
