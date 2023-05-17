const Apple = ["Apple","fruit","95"];
function Food() {
    function Food({arr}) {
        return (
          <div>
            <h1>This is the food</h1>
            <ol>
              {arr.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        );
    }
    return (
        <>
            <h1>this is the food</h1>
            <Food arr = {Apple} />
        </>
    );
}

export default Food;
