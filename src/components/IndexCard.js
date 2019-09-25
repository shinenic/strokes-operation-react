import React, { PureComponent } from 'react'
import styled from 'styled-components';
import BooksImg from '../image/indexCard/books.png';
import checkImg from '../image/indexCard/check.png';
import linkImg from '../image/indexCard/link.png';
import { ShowDivAni } from '../styles/AnimationStyled';
import CountUp from 'react-countup';
import { connect } from 'react-redux';
import { cleanAllInput } from '../actions';

const CardThemeColor = ['#DB6623', '#3E5EB3', '#AAC634'];
const CardImg = [BooksImg, checkImg, linkImg];

const IndexCardDiv = styled.div`
  height:100%;
  width:100%;
  grid-area: main;
  color:rgb(49,54,66);
`;
const GridContainer = styled.div`
  height:100%;
  width:100%;
  display:grid;
  grid-template-columns:80px 0.33fr 0.33fr 0.33fr 160px;
  grid-template-rows:0.3fr 400px 0.7fr;
  grid-template-areas:
    ". . . . ."
    ". card0 card1 card2 ."
    ". . . . .";
`;

const Image = styled.img`
  content:url(${props => CardImg[props.cardIndex]});
  height:67%;
  width:67%;
  filter:invert(1);
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
`;

const ImgBorder = styled.div`
  border-radius:50%; 
  /* border: 3px solid rgb(215,225,235);  */
  transition: 0.3s;
  background:${props => CardThemeColor[props.cardIndex]};
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
  height:64px;
  width:64px;
  margin: 60px auto 60px auto;
  cursor: pointer;
  position:relative;
  display: grid;
  justify-content: center;
  align-items: center;
`;
const CountText = styled.span`
  grid-area:data;
  font-weight:bold;
  font-size:26px;
  display: grid;
  align-items: start;
`;
const TitleText = styled.h2`
  grid-area:title;
  display: grid;
  align-items: start;
`;

const Card = styled.div`
  grid-area:${props => 'card' + props.cardIndex};
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1); 
  border-radius:5px;
  transition: 0.3s;
  width:80%;
  max-width:250px;
  height:95%;
  box-sizing:border-box;
  margin:0px auto;
  padding:5px;
  text-align:center;
  animation: ${ShowDivAni} 0.5s 1 both ${props => (Number(props.cardIndex) * 0.2 + 0.1).toString() + 's'};
  background:rgb(217,225,232);
  &:hover{
    height:100%;
    border-bottom:10px solid ${props => CardThemeColor[props.cardIndex]};
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.2); 
  }
  &:hover ${ImgBorder} {
    height:80px;
    width:80px;
  }
`;

const CardGridContent = styled.div`
  height:100%;
  width:100%;
  display:grid;
  grid-template-rows:0.5fr 0.2fr 0.3fr;
  grid-template-areas:
    "img"
    "title"
    "data";
`;

class IndexCard extends PureComponent {
  render() {
    const pickedCount = obj => {
      return Object.keys(obj).reduce((acc, index) => {
        return acc + obj[index].length;
      }, 0)
    }
    return (
      <IndexCardDiv>
        <GridContainer>

          <Card cardIndex={0}>
            <CardGridContent>
              <ImgBorder cardIndex={0}><Image cardIndex={0} /></ImgBorder>
              <TitleText>單字庫</TitleText>
              <CountText>
                <CountUp
                  separator=","
                  suffix="  字"
                  end={Object.keys(this.props.character).length} />
              </CountText>
            </CardGridContent>
          </Card>

          <Card cardIndex={1}>
            <CardGridContent>
              <ImgBorder cardIndex={1}><Image cardIndex={1} /></ImgBorder>
              <TitleText>已選擇組合</TitleText>
              <CountText>
                <CountUp
                  separator=","
                  suffix="  組"
                  end={pickedCount(this.props.pickedComb)} />
              </CountText>
            </CardGridContent>
          </Card>

          <Card cardIndex={2}>
            <CardGridContent>
              <ImgBorder cardIndex={2}><Image cardIndex={2} /></ImgBorder>
              <TitleText>總組合數</TitleText>
              <CountText>
                <CountUp
                  separator=","
                  suffix="  組"
                  end={Object.keys(this.props.character).length * Object.keys(this.props.character).length} />
              </CountText>
            </CardGridContent>
          </Card>

        </GridContainer>
      </IndexCardDiv >
    )
  }
}
const mapStatetoProps = state => {
  return {
    character: state.character,
    pickedComb: state.pickedComb
  }
}
const mapDispatchToProps = dispatch => {
  return {
    cleanAllInput: () => dispatch(cleanAllInput())
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(IndexCard);