// import { isVisible } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { Button,Grid,TextField,List, ListItem, ListItemText } from '@mui/material'
// let ShowHide = ()=>{

//     const [isVisible,setText] = useState("Hello, React");

//     const toggleVisbility = () => {
//         setText(prev => !prev);
//     }

//     return(
//         <div>
//             {/* <h1>{text}</h1> */}

//             <button onClick={toggleVisbility}>{isVisible ? '숨기기' : '보이기'}</button>
//             {isVisible && <p>Hello,React</p>}
//         </div>
//     );

// }
// export default ShowHide;


let Sol1 = () => {
    const [input, setInput] = useState("");        // 입력 값
    const [items, setItems] = useState([]);        // 리스트 저장

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const onButtonClick = () => {
        if (input.trim() === '') {
            alert('내용을 입력하세요');
            return;
        }

        setItems(prev => [...prev, input]); // 리스트에 추가
        setInput(""); // 입력창 비우기
    };

    
    return (
        <div style={{ padding: 10 }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid xs={1} md={1} item >
                    <TextField
                        value={input}
                        onChange={handleChange}
                        fullWidth
                        label="내용을 입력하세요"
                    />
                </Grid>
                <Grid  xs={1} md={1} item>
                    <Button 
                        variant="contained" 
                        onClick={onButtonClick}>
                        추가
                    </Button>
                </Grid>
            </Grid>

            <List style={{ marginTop: 10 }}>
                {items.map((item, index) => (
                    <ListItem key={index} divider style={{justifyContent : "center"}}>
                        <ListItemText primary={item}  />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
export default Sol1;