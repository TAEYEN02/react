import { useState } from 'react';
import './App.css';
import Todo from './Todo';
import {List,Paper} from '@mui/material'
import AddTodo from './AddTodo';
import {Container} from '@mui/material';

//Container 
//레이아웃의 가로 폭을 제한하고, 중앙 정렬 및 기본 패딩을 자동으로 적용해주는 컴포넌트
 
//주요 props
//maxWidth : 최대 너비를 지정(xs,sm,md,lg,xl,false)
//fixed : maxWidth
function App() {
  //하나의 할 일을 객체로 관리할 것이다
  //id, title, done
  const [items, setItems] = useState([])

  //Todo를 직접 추가하기 위한 백엔드 콜을 대신할 가짜함수를 만들어보자
  const add =(item)=>{
    //newItem 객체가 하나의 Todo
    const newItem ={
      ...item,
      id: "ID-" + item.length,
      done : false
    }
    //상태를 변화시키는 함수를 호출하면 state의 변경사항이 화면에 적용이된다.
    setItems(prev => [...prev, newItem])
    console.log("items : ",[...items, newItem])

  }




  //삭제를 해주는 deleteItem()함수 만들기
  //delete from 테이블 where id=0;
  const deleteItem =(item) =>{
    //배열에서 삭제하려는 아이템 찾기
    //filter => 참이되는것만 남겨두는거
    const newItems = items.filter(e => e.id !== item.id)
    //삭제할 아이템을 제외한 아이템을 다시 배열에 지정한다.
    setItems([...newItems])
  }

  const editItem = () => {
    setItems([...items]);// -> 렌더링
  }


//react는 key 속성에 들어있는 값을 참조해서 리스트의 요소가 변경될 경우 
//어떤 요소가 변경되었는지 빠르게 파악할 수 있다.
const todoItems = items.length > 0 && 


//Paper컴포넌트
//종이 같은 표면 효과를 제공하는 컨테이너 컴포넌트
//elevation(그림자깊이)를 통해 높낮이를 표현하고
//배경색과 그림자 효과로 콘텐츠를 돋보이게 한다.
<Paper style={{margin: 16}}>
  <List> {/*일련의 학목을 세로로 나열하는 컨테이나 역할 */}
    {items.map((item) => (
      <Todo item={item} key={item.id} deleteItem={deleteItem} editItem={editItem}/>
    ))}
  </List>
</Paper>

  return (
    <div className="App">
      <Container maxWidth="md">
        {/* AddTodo에 add함수를 전달 {add:function add(item) {~ } */}
      <AddTodo add={add}/>{/*AddTodo에 add함수를 전달*/}
      <div className='TodoList'>
        {todoItems}
      </div>
      </Container>
    </div>
  );
}


export default App;
