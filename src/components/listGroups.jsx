import React from "react";

function ListGroups({children}) {
    return (
        <ol className="list-group list-group-numbered">
            {children}
        </ol>
    )
}
export default ListGroups;