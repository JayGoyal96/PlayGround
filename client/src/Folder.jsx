import React from 'react';

const Folder = ({explorer}) => {
  const [expand, setExpand] = React.useState(false);
  return <>
    <ul>
        {explorer.map((file) => {
            return <li>{file}</li>;
        })}
    </ul>
  </>;
};

export default Folder;
