//for spin effect in the page, install better-react-spinkit
import styled from "styled-components"
import {Circle} from "better-react-spinkit"

function Loading() {
    return (
        <center style={{
            display: "grid",
            placeItems:"center",
            height:"100vh",
        }}>

            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="" 
                    height={200}
                    style={{
                        marginBottom:10,
                    }}
                />
                <Circle color="#3CBC2B" size={60}></Circle>
            </div>
            </center>
    )
}

export default Loading
