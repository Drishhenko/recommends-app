import React, { useContext } from 'react'
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import OverviewItem from "./OverviewItem";

const OverviewLast = observer(() => {
    const { overview } = useContext(Context);
    const newOverviews = []

    for (let item of overview.overviews) {
        newOverviews.push(item) 
    }

  return (
    <div className='mt-4'>
        {newOverviews.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(i => 
        <OverviewItem key={i.id} overview={i}/>
      )}
    </div>
  )
})

export default OverviewLast
