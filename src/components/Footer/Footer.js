import React from 'react'
import { Grid } from '@material-ui/core'
import styled from '@emotion/styled'

const ColorKeyItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`

const ColorKeyBox = styled.span`
  display: inline-block;
  height: 1rem;
  width: 1rem;
  margin-right: 5px;
`

const Footer = () => {
  return (
    <Grid container justify="center">
      <ColorKeyItem>
        <ColorKeyBox style={{ backgroundColor: '#4286F4' }}></ColorKeyBox>
        <span>Unsorted</span>
      </ColorKeyItem>
      <ColorKeyItem>
        <ColorKeyBox style={{ backgroundColor: '#4ED860' }}></ColorKeyBox>
        <span>Compare</span>
      </ColorKeyItem>
      <ColorKeyItem>
        <ColorKeyBox style={{ backgroundColor: '#DB3939' }}></ColorKeyBox>
        <span>Swap</span>
      </ColorKeyItem>
      <ColorKeyItem>
        <ColorKeyBox style={{ backgroundColor: '#A95CE8' }}></ColorKeyBox>
        <span>Sorted</span>
      </ColorKeyItem>
      <ColorKeyItem>
        <ColorKeyBox style={{ backgroundColor: '#EDEA3B' }}></ColorKeyBox>
        <span>Pivot</span>
      </ColorKeyItem>
    </Grid>
  )
}

export default Footer