export default function(filename: string) {
  const componentfile = `import * as React from 'react';
import { Typeography } from './${filename}.style';

const ${filename} = () => {
    return (
        <>
        <Typeography>hEy BuCkOo 😍😍</Typeography>
        </>
    );
};

export default ${filename}
`;
  return componentfile;
}
