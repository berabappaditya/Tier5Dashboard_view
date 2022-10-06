import React from 'react'
import { styled } from '@mui/material/styles';
import {default as BUTTON} from '@mui/material/BUTTON';

// import Stack from '@mui/material/Stack';
// import { purple } from '@mui/material/colors';

const ColorButton = styled(BUTTON)({
  boxShadow: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  
 textTransform: 'uppercase',

  transition: '0.5s',
  borderColor: '#84fab0',
   textDecoration:'none',
  backgroundImage: "linear-gradient(45deg, #84fab0 10%, #8fd3f4 100%)",
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
 backgroundImage: "linear-gradient(-135deg, #84fab0 10%, #8fd3f4 100%)",
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#84fab0',
  },
  '&:focus': {
    // backgroundPosition: "right center",
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});



export default function Button(props) {
    return (
       <ColorButton variant="contained">{props.name}</ColorButton>
    )
    }

const SubColorBtn=styled(BUTTON)({
    backgroundColor: '#075df2',
    '&:hover': {
        backgroundColor: '#2874f7',
        },
})


export function SubmitButton(props) {
    return (
       <SubColorBtn variant="contained" classes={"submit_btn"} className="submit_btn" onClick={props.onClick}>{props.name}</SubColorBtn>
    )
    }