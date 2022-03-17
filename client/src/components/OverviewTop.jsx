import React from "react";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import OverviewItem from "./OverviewItem";
import { Container} from "react-bootstrap";

const OverviewTop = observer(() => {
  const { overview } = useContext(Context);

  return (
    <Container>
      <h1>Топовые обзоры</h1>
      {overview.overviews.map(i => 
        <OverviewItem key={i.id} overview={i}/>
      )}
    </Container>
  );
});

export default OverviewTop;
