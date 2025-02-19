



const Header = (props)=>{
const flagUser = props.user


    return(
        <div>
            <img src="" alt="" />
            <h1>Geo Fun</h1>
            {flagUser ? (<img src="" alt="" />): null}
        </div>
    )
}

export default Header