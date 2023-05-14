import MyForm from './login'
export default function HomeDisplay(){
    return (
        <>
            <h2>Your Information:</h2>
            <MyForm question = "Weight: " changeValue = {setWeight}/>
        </>
    );
}