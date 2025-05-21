import React, {useState} from "react";

const Input = () => {
    const [txtvalue, setTextValue] = useState("");

    const onChange = (e) => {
        setTextValue(e.target.value);
    };

    return(
        <div>
            <input type="text" value={txtvalue} onChange={onChange} />
            <br />
            <p>{txtvalue}</p>
        </div>
    );
};

export default Input;
