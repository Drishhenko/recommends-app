import React, { useContext }from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import OverviewItem from "./OverviewItem";
import { Container} from "react-bootstrap";

const OverviewTop = observer(() => {
  const { overview } = useContext(Context);
  const newOverviews = []
  for (let item of overview.overviews) {
    let ratingsArray = []
    for ( let rate of item.overalRating) {
      ratingsArray.push(rate.rate)
    } 
    if(ratingsArray.length > 1) {
      item['averageRating'] = ratingsArray.reduce((a, b) => (a+b))/ratingsArray.length
      newOverviews.push(item)
    } else {
      item['averageRating'] = ratingsArray[0]
      newOverviews.push(item)
    }
  }
  
  return (
    <div className='mt-4'>
      {newOverviews.sort((a, b) => a.averageRating < b.averageRating ? 1 : -1).map(i => 
        <OverviewItem key={i.id} overview={i}/>
      )}
    </div>
  );
});

export default OverviewTop;
