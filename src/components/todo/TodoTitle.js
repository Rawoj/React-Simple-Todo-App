import React from 'react';

function datePadding(str){
    if(str.length < 2) {
        return "0"+str;
    }
    return str;
}

function TodoTitle() {
    let today = new Date();
    let day = datePadding(today.getDate().toString());
    let month = datePadding((today.getMonth() + 1).toString());
    let year = today.getFullYear();
    let dateString = day + "-" + month + "-" + year;
    return (
        <div className="todo-title">
            {dateString}
        </div>          
    );
}

export default TodoTitle;