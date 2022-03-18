import React, { useContext } from 'react'
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import OverviewItem from "./OverviewItem";
import { Container} from "react-bootstrap";

const OverviewLast = observer(() => {
    const { overview } = useContext(Context);
    const newOverviews = []

    for (let item of overview.overviews) {
        newOverviews.push(item) 
    }

  return (
    <Container>
        <h1>Последние обзоры</h1>
        {newOverviews.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(i => 
        <OverviewItem key={i.id} overview={i}/>
      )}
    </Container>
  )
})

export default OverviewLast
