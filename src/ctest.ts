export default function(filename: string) {
  const testfile = `import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ${filename} from './${filename}';

describe('${filename}', () => {
    it('Can initialize without throwing errors', () => {
        expect(() => renderer.create(<${filename} />)).not.toThrow();
    });
});
`;
  return testfile;
}
