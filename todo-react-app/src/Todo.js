import {useState} from 'react'
import {ListItem, 
        ListItemText, 
        InputBase, 
        Checkbox} from '@mui/material'

//현재 파일에서는 checkBox와 label 컴포넌트를 만들어보자

let Todo = (props) => {

    const [item, setItem] = useState(props.item);
    return(

        //html코드가 들어가는 부분
        //속성을 쓸 때 카멜케이스로 작성하기
        //onclick -> onClick
        //class -> className
        <ListItem>
            <Checkbox checked={item.done}/>
            <ListItemText>
                <InputBase
                    inputProps={{"aria-label" : "naked"}}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                />
            </ListItemText>
        </ListItem>
    )
}


    // const TodoList = (item)=>{
    //     //html 코드가 들어가는 부분
    //     //return하는 요소는 하나이기 때문에 div로 묶기
    //     //속성을 쓸때 카멜케이스로 작성하기
    //     //onClick ClassName
    //     return (
    //         <div className="Todo">
    //         <input
    //             type="checkbox"
    //             id={item.id}
    //             name={item.id}
    //             checked={item.done} />
                
    //         <label for={item.id}>{item.title}</label> 
      
    //         {/*label태그는 for 속성에 name값으로 연결해서 어떤 요소와 연결될지 지정*/}       
    //     </div>
    //     )
       
    // }


    // // let list = []
    // // props.item.forEach((item)=>{
    // //     list.push(TodoList.item)
    // // })

    // //forEach는 안되는걸로, map으로 콜백함수로 변환해서 새 배열 반환


    // return(
    //     props.item.map(TodoList)
    // )


export default Todo;