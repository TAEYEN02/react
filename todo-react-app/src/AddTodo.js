import {useState} from 'react'
import { Button,Grid,TextField } from '@mui/material'
//Button
//다양한 스타일(variant) : text, contained, outlined
//색상(color),크기(size)를 지원하는 버튼 컴포넌트

//Grid2
//CSS Grid 레이아웃 기반의 그리드 시스템
//Flexbox 기반의 기존 Grid보다 행, 열 제어가 직관적이고, rowSpacing, columnSpacing으로
//간격을 조절할 수 있다.
//주요 props
//container : 그리드 컨테이너로 설정
//item : 그리드 아이템으로 설정(생략해도 자동 감지)
//xs, sm, md, lg, xl : 각 브레이킹포인트별 차지할 컬럼수(기본 12분할)
//브레이킹포인트 : 화면 너비 기준값
//columns : 총 컬럼수 조정(기본 12)
//rowSpacing, columnSpacing : 행,열 간격

//TextField
//입력(input), 라벨(label), 헬퍼 텍스트(helperText), 에러표시(error)를 한번에
//처리해줄 수 있는 컴포넌트
//variant : 스타일 설정
//label : 라벨 테스트
//helperText : 입력 하단 도움텍스트
//error : 에러상태 표시 true만 빨간색 표시
//fullWidth : 가로 100%차지 여부
//multiline : 여러줄 입력 여부
//rows : multiline일 때 보이는 줄 수
//type : text, password, email 등 입력 타입

//react에서 style을 줄때는 js객체 형식으로 줘야한다

//props로 넘어온 내용을 받아서 사용할 준비가 끝남
const AddTodo = ({add}) =>{
   


    const [item,setItem] =useState({title:""})

    const onInputChange =(e)=>{
        setItem({title:e.target.value});
        console.log({title:e.target.value});
    }

    const onButtonClick = () => {
        if(item.title.trim()===''){
            alert('내용을 입력하세요');
            return;//진행하지 않고 함수를 빠져나간다
        }

        add(item);//add({titel:'내용'})
        setItem({title:""})//함수에 전달을 하고나면 입력 필드를 비워준다
    }

    const enterKeyEventHandler =(e)=>{
        if(e.key =="Enter"){
            onButtonClick();
        }
    }

    return(
        <Grid 
            container 
            style={{ marginTop: 20 }} 
            justifyContent ="center"
        >
            <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                <TextField 
                placeholder='Add Todo here' 
                fullWidth
                value={item.title}
                onChange={onInputChange}
                onKeyDown={enterKeyEventHandler} />
            </Grid>
           
            <Grid xs={1} md={1} item>
                <Button 
                    fullWidth
                    style={{ height: '100%'}}
                    color="secondary"
                    variant='outlined'
                    onClick={onButtonClick}>
                    +
                </Button>
            </Grid>
        </Grid>
    )
    

}
export default AddTodo;
