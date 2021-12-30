import React, { useState } from 'react'
import SingleGoal from './SingleGoal'
import CreateGoal from './NewGoal'
import { useGlobalContext } from '../context'

function GoalCont() {
  const { chalanges } = useGlobalContext()
  const goals = [...chalanges]
  return (
    <section className="goal-cont">
      <h1 className="subheading">Goals</h1>
      {goals.map((chalange) => {
        return <SingleGoal key={chalange._id} {...chalange} />
      })}
      <CreateGoal />
    </section>
  )
}

export default GoalCont
