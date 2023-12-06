import withBase from 'hocs/withBase'
import React from 'react'

const MyCart = (props) => {
  return (
    <div onClick={() =>props.navigate('/')}>
      MyCart
    </div>
  )
}

export default withBase(MyCart)
