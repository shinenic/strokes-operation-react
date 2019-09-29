import React, { PureComponent } from 'react'
import styled from 'styled-components'
import BooksImg from '../image/indexCard/books.png'
import checkImg from '../image/indexCard/check.png'
import linkImg from '../image/indexCard/link.png'
import { ShowDivAni } from '../styles/AnimationStyled'
import Color from '../styles/ThemeColor'
import CountUp from 'react-countup'
import { connect } from 'react-redux'
import { cleanAllInput } from '../actions'

const CardImg = [BooksImg, linkImg, checkImg]

const IndexCardDiv = styled.div`
  height:100%;
  width:100%;
  grid-area: main;
  color:${Color.black[0]};

  display:grid;
  grid-template-columns:80px 0.33fr 0.33fr 0.33fr 130px;
  grid-template-rows:0.3fr 400px 0.7fr;
  grid-template-areas:
    ". . . . ."
    ". card0 card1 card2 ."
    ". . . . .";
  @media (max-width: 768px) {
    grid-template-columns:40px 0.33fr 0.33fr 0.33fr 90px;
    grid-template-rows:0.1fr 400px 0.9fr;
  }
  @media (max-width: 480px) {
    grid-template-columns:10px 1fr 10px;
    grid-template-rows:50px 0.33fr 0.33fr 0.33fr 50px;
    grid-template-areas:
    ". . ."
    ". card0 ."
    ". card1 ."
    ". card2 ."
    ". . .";
    display: grid;
    justify-content: center;
    align-items: center;
  }
`

const Image = styled.img`
  content:url(${props => CardImg[props.cardIndex]});
  height:67%;
  width:67%;
  transition: 0.3s;
  filter:invert(0.9);
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
`

const ImgBorder = styled.div`
  border-radius:50%; 
  transition: 0.3s;
  background:${props => Color.card[props.cardIndex]};
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
  height:64px;
  width:64px;
  margin: 60px auto 60px auto;
  cursor: pointer;
  position:relative;
  display: grid;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px) {
    height:40px;
    width:40px;
    margin:0 auto;
  }
`
const CountText = styled.div`
  grid-area:data;
  font-weight:bold;
  font-size:26px;
  display: grid;
  align-items: start;
  justify-content: center;
  @media (max-width: 480px) {
    justify-content: center;
    align-items: center;
  }
`
const TitleText = styled.div`
  grid-area:title;
  display: grid;
  font-size:24px;
  font-weight:bold;
  justify-content: center;
  align-items: start;
  @media (max-width: 480px) {
    justify-content: start;
    align-items: center;
  }
  @media (max-width: 400px) {
    justify-content: center;
  }
`

const Card = styled.div`
  grid-area:${props => 'card' + props.cardIndex};
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1); 
  border-radius:5px;
  transition: 0.3s;
  width:80%;
  max-width:250px;
  height:95%;
  margin:0px auto;
  padding:5px;
  animation: ${ShowDivAni} 0.5s 1 both ${props => (Number(props.cardIndex) * 0.2 + 0.1).toString() + 's'};
  background:${Color.cardBg};
  &:hover{
    height:100%;
    border-bottom:10px solid ${props => Color.card[props.cardIndex]};
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.2); 
    margin:0px auto;
  }
  &:hover ${ImgBorder} {
    height:80px;
    width:80px;
  }
  &:hover ${Image} {
    filter:invert(1);
  }
  @media (max-width: 480px) {
    width:92%;
    max-width:none;
    height:50%;

    &:hover{
      width:94%;
      height:50%;
      border-right:7px solid ${props => Color.card[props.cardIndex]};
      border-bottom:none;
      box-shadow: 0 4px 6px 0 rgba(0,0,0,0.2); 
    }
    &:hover ${ImgBorder} {
      height:50px;
      width:50px;
    }
    &:hover ${Image} {
      filter:invert(1);
    }
  }
`

const CardGridContent = styled.div`
  height:100%;
  width:100%;
  display:grid;
  grid-template-rows:0.5fr 0.2fr 0.3fr;
  grid-template-areas:
    "img"
    "title"
    "data";
  @media (max-width: 480px) {
    grid-template-columns:0.28fr 0.36fr 0.36fr;
    grid-template-rows:1fr;
    grid-template-areas:
    "img title data";
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 400px) {
    grid-template-columns:50px 0.5fr 0.5fr;
  }
`

class IndexCard extends PureComponent {
  render () {
    const pickedCount = obj => {
      return Object.keys(obj).reduce((acc, index) => {
        return acc + obj[index].length
      }, 0)
    }
    return (
      <IndexCardDiv>
        <Card cardIndex={0}>
          <CardGridContent>
            <ImgBorder cardIndex={0}><Image cardIndex={0} /></ImgBorder>
            <TitleText>單字庫</TitleText>
            <CountText>
              <CountUp
                separator=","
                suffix="  字"
                end={Object.keys(this.props.character).length}
              />
            </CountText>
          </CardGridContent>
        </Card>

        <Card cardIndex={1}>
          <CardGridContent>
            <ImgBorder cardIndex={1}><Image cardIndex={1} /></ImgBorder>
            <TitleText>總組合數</TitleText>
            <CountText>
              <CountUp
                separator=","
                suffix="  組"
                end={Object.keys(this.props.character).length * Object.keys(this.props.character).length}
              />
            </CountText>
          </CardGridContent>
        </Card>

        <Card cardIndex={2}>
          <CardGridContent>
            <ImgBorder cardIndex={2}><Image cardIndex={2} /></ImgBorder>
            <TitleText>已選擇組合</TitleText>
            <CountText>
              <CountUp
                separator=","
                suffix="  組"
                end={pickedCount(this.props.pickedComb)}
              />
            </CountText>
          </CardGridContent>
        </Card>
      </IndexCardDiv>
    )
  }
}
const mapStateToProps = state => {
  return {
    character: state.defaultReducer.character,
    pickedComb: state.defaultReducer.pickedComb
  }
}
const mapDispatchToProps = dispatch => {
  return {
    cleanAllInput: () => dispatch(cleanAllInput())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(IndexCard)
