import React, { PureComponent } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import Pusheen from '../image/Pusheen3.png';

const AboutDiv = styled.div`
  position:absolute;
  left:0;
  top:0;
  padding-top:40px;
  width:100vw;
  overflow:hidden;
  white-space: pre-line;
`;
const ImgDiv = styled.div`
  float:left;
  margin-left:6vw;
  height:30vw;
  width:30vw;
    img{
        content:url(${Pusheen});
        width:auto;
        height:auto;
        max-height: 100%;  
        max-width: 100%; 
    }
`;
const IntroduceDiv = styled.div`
  box-sizing: border-box;
  padding-left:5vw;
  margin-top:-4vw;
  float:left;
  height:33vw;
  width:63vw;
  line-height:7vw;
  display: table;
  font-size:15px;
  color: #9DD7FF;
  div{
    display: table-cell;
    vertical-align: middle;
  }
`;

const Title = styled.div`
  padding-left:2.5vw;
  float:left;
  width:100vw;
  color:white;
  font-size:23px;
  font-weight:bold;
  margin:70px 0 30px 0;  
`;
const Title2 = styled(Title)`
  margin:70px 0 0 0;  
`;
const InfoDiv = styled.div`
  box-sizing: border-box;
  float:left;
  width:100vw;
  padding:3vw 0 0 5vw;
`;
const SubTitle = styled.span`
    color:white;
    font-size:21px;
    font-weight:bold;
    line-height:60px;
`;
const Content = styled.span`
    margin-left:10px;
    color:#9DD7FF;
    font-size:15px;
    line-height:37px;
    a{
        color:#9DD7FF;
    }
`;
const Bottom = styled.div`
    float:left;
    width:100vw;
    height:15vw;
    margin:30vw 0 0 0;
    color:white;
    line-height:15vw;
    font-size:13px;
    text-align:center;
    background:#444;
`;



class About extends PureComponent {
    render() {
        return (
            <AboutDiv>
                <Title>關於作者：</Title>
                <ImgDiv>
                    <img alt="Pusheen" />
                </ImgDiv>
                <IntroduceDiv>
                    <div>
                        <span style={{ fontSize: '21px', color: 'white', fontWeight: 'bold' }}>
                            Kadenz Wei</span><br />
                        Piano arranger/performer <br />
                        Classic, Jazz, Pop music<br />
                        Live in Taiwan Taipei city
                    </div>
                </IntroduceDiv>

                <Title2>網頁介紹：</Title2>
                <InfoDiv>
                    <SubTitle>搜尋畫面<br /></SubTitle>
                    <Content>輸入可直接搜尋 歌名/歌手/冊數/頁碼<br /></Content>
                    <Content>預設資料為1至104冊之範圍<br /></Content>
                    <Content>連續點3次歌名可連結至Youtube搜尋<br /></Content>
                    <Content>連續點3次演唱者可搜尋演唱者之所有曲目<br /><br /></Content>
                    <SubTitle>歌手名單畫面<br /></SubTitle>
                    <Content>連點2次演唱者可搜尋演唱者之所有曲目<br /><br /></Content>
                    <SubTitle>歷史紀錄<br /></SubTitle>
                    <Content>可查詢搜尋的所有紀錄和時間<br /></Content>
                    <Content>(重新整理後重新計算)<br /><br /></Content>
                    <SubTitle>最新資料<br /></SubTitle>
                    <Content>資料來源:<br /></Content>
                    <Content>&nbsp;&nbsp;<a style={{ fontSize: '13px' }} href="mailto: http://www.musicbook.com.tw/searchsong/">http://www.musicbook.com.tw/searchsong/</a><br /></Content>
                    <Content>如資料有誤或任何建議請不吝指教<a href="mailto: galadiya41@gmail.com">聯絡我</a><br /><br /></Content>
                </InfoDiv>

                <Title2>更新日誌：</Title2>
                <InfoDiv>
                    <SubTitle>2019/05/15<br /></SubTitle>
                    <Content>- 新增連結至youtube搜尋之功能<br /></Content>
                    <SubTitle>2019/05/26<br /></SubTitle>
                    <Content>- 新增封面圖片<br /></Content>
                    <SubTitle>2019/06/01<br /></SubTitle>
                    <Content>- 新增英文老歌資料<br /></Content>
                    <Content>- 增強搜尋效能<br /></Content>
                    <SubTitle>2019/06/24<br /></SubTitle>
                    <Content>- 修正英文歌曲搜尋的bug<br /></Content>
                    <Content>- 增強網頁載入速度<br /></Content>
                </InfoDiv>
                <Bottom>&copy; Copyright {new Date().getFullYear()} Zhuo-Zhe-Search. All Rights Reserved</Bottom>
            </AboutDiv>
        )
    }
}

export default connect()(About);
