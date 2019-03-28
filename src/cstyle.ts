export default function(filename: string) {
  const componentfile = `import styled from '../../theme/index';

export const Typeography = styled.h1\`
    -webkit-font-smoothing: antialiased;
    text-align: center;
    font-size: 48px;
\`;
  `;
  return componentfile;
}
